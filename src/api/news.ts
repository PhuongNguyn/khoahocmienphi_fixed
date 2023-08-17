import { fetchApi } from ".";
const pathname = "/news";

export const getAllNews = async () => {
    try {
        const url = pathname + `/getAllNews`;
    
        const response = await fetchApi().get(url);
    
        return response;
      } catch (error) {
        throw error;
      }
}

export const getNewsBySlug = async (slug: string) => {
    try {
        const url = pathname + `/getNewsBySlug/${slug}`;
    
        const response = await fetchApi().get(url);
    
        return response;
      } catch (error) {
        throw error;
      }
}
