import { createContext, JSX, useContext, useEffect, useState } from "react";
import { ResumeResponse } from "./models/ResumeModel";
import { CommentResponse } from "./models/Comments";
import { useResumeService } from "@/services/resumeService";
import { useCommentService } from "@/services/commentService";
import { useDebouncedCallback } from "@mantine/hooks";

interface DataContextInterface {
  resume: ResumeResponse | undefined;
  testimonials: CommentResponse[] | undefined;
  isLoading: boolean;
  refresh: () => void;
}

const DataContext = createContext<DataContextInterface | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useDataContext = () => {
  const ctx = useContext(DataContext);
  if (ctx == undefined) {
    throw new Error("useDataContext has no context!");
  }

  return ctx;
};

type Props = {
  children: JSX.Element;
};

export const DataProvider = ({ children }: Props) => {
  const resumeService = useResumeService();
  const commentService = useCommentService();

  const [resume, setResume] = useState<ResumeResponse>();
  const [testimonials, setTestimonials] = useState<CommentResponse[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchResume = async () => {
    setResume(await resumeService.getMainResume());
  };

  const fetchTestimonials = async () => {
    setTestimonials(await commentService.getPublicTestimonials());
  };

  const refresh = () => {
    setIsLoading(true);
    fetchResume();
    fetchTestimonials();
    setIsLoading(false);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataContext.Provider
      value={{
        resume,
        testimonials,
        isLoading,
        refresh: useDebouncedCallback(refresh, 100),
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
