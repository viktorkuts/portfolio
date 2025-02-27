package com.viktorkuts.portfolio_be.images.presentationlayer;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import com.viktorkuts.portfolio_be.images.datalayer.ImageRepository;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/images")
public class ImageController {
    private final ImageRepository imageRepository;

    public ImageController(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<Image> uploadImage(@RequestPart(value = "files") Mono<FilePart> file) {
        return imageRepository.uploadImage(file);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping(value = "/{imageId}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<Image> updateImage(@PathVariable String imageId, @RequestPart(value = "files") Mono<FilePart> file) {
        return imageRepository.updateImage(imageId, file);
    }
}
