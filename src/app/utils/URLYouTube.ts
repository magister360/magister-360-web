
export const getYouTubeVideoId = (url: string): string | null => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };
  

  export const addUrlYouTubeVideoId=(videoId:string)=>{
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  export const getYouTubeThumbnail = (videoId: string,iconDefauult:string) => {
    if (videoId !== undefined && videoId !== "") {
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    } else {
      return iconDefauult;

    }
  };
