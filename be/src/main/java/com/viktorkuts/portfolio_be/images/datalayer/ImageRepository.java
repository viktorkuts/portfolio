package com.viktorkuts.portfolio_be.images.datalayer;

import com.viktorkuts.portfolio_be.utils.exceptions.NotFoundException;
import io.minio.*;
import io.minio.errors.*;
import io.minio.messages.Bucket;
import io.minio.messages.Item;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Iterator;
import java.util.UUID;

@Service
public class ImageRepository {
    private final MinioClient minioClient;
    @Value("${minio.access.bucket.name}")
    private String bucketName;

    public ImageRepository(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    public Flux<Bucket> getAllBuckets(){
        return Flux.create(sink -> {
            try {
                minioClient.listBuckets()
                        .forEach(sink::next);
                sink.complete();
            }catch (Exception e){
                sink.error(e);
            }
        });
    }

    public Flux<Image> getAllImagesInBucket(String bucketName) {
        return Flux.create(sink -> {
            try {
                ListObjectsArgs args = ListObjectsArgs.builder()
                        .bucket(bucketName)
                        .build();
                for (Result<Item> result : minioClient.listObjects(args)) {
                    try {
                        Item item = result.get();
                        Image image = new Image(item.objectName(), bucketName);
                        sink.next(image);
                    } catch (Exception e) {
                        sink.error(e);
                    }
                }
                sink.complete();
            } catch (Exception e) {
                sink.error(e);
            }
        });

    }


    public Mono<Image> uploadImage(Mono<FilePart> file) {
        return file.flatMap(f -> {
            String objName = f.filename();
            File temp = new File(objName);
            return f.transferTo(temp)
                    .then(Mono.fromCallable(() -> {
                        try {
                            UploadObjectArgs args = UploadObjectArgs.builder()
                                    .bucket(bucketName)
                                    .object(UUID.randomUUID().toString())
                                    .filename(temp.getAbsolutePath())
                                    .build();

                            ObjectWriteResponse res = minioClient.uploadObject(args);
                            return Image.builder().bucket(res.bucket()).id(res.object()).build();
                        } catch (Exception e) {
                            throw new RuntimeException("Failed to upload image", e);
                        } finally {
                            temp.delete();
                        }
                    }))
                    .onErrorResume(e -> Mono.error(new RuntimeException("Failed to upload image", e)));
        });
    }


    public Mono<Image> updateImage(String imageId, Mono<FilePart> file) {

        return file.flatMap(f -> {
            GetObjectArgs args = GetObjectArgs.builder()
                    .bucket(bucketName)
                    .object(imageId)
                    .build();

            try {
                minioClient.getObject(args);
            } catch (Exception e) {
                return Mono.error(new NotFoundException("Image not found", e));
            }
            File temp = new File(f.filename());
            return f.transferTo(temp)
                    .then(Mono.fromCallable(() -> {
                        try {
                            UploadObjectArgs wArgs = UploadObjectArgs.builder()
                                    .bucket(bucketName)
                                    .object(imageId)
                                    .filename(temp.getAbsolutePath())
                                    .build();
                            ObjectWriteResponse res = minioClient.uploadObject(wArgs);
                            temp.delete();
                            return Image.builder().bucket(res.bucket()).id(res.object()).build();
                        } catch (Exception e) {
                            throw new RuntimeException("Failed to upload image", e);
                        }
                    }))

                    .onErrorResume(e -> Mono.error(new RuntimeException("Failed to update image", e)));

        });
    }

    public Mono<Void> deleteImage(String imageId) {
        return Mono.create(sink -> {
            GetObjectArgs argsGet = GetObjectArgs.builder()
                    .bucket(bucketName)
                    .object(imageId)
                    .build();

            try {
                minioClient.getObject(argsGet);
            } catch (Exception e) {
                sink.error(new NotFoundException("Image not found", e));
                return;
            }

            try {
                RemoveObjectArgs args = RemoveObjectArgs.builder()
                        .bucket(bucketName)
                        .object(imageId)
                        .build();
                minioClient.removeObject(args);
                sink.success();
            } catch (Exception e) {
                sink.error(new RuntimeException("Failed to delete image", e));
            }
        });
    }
}
