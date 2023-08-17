import { fetchApi } from ".";
const pathname = "/post";

export const getPageBySlug = async (slug: string) => {
  try {
    const url = pathname + `/getPageBySlug/${slug}`;

    const response = await fetchApi().get(url);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getPostByCateSlug = async (slug: string) => {
    try {
        const url = pathname + `/getPostByCategorySlug/${slug}`;
    
        const response = await fetchApi().get(url);
    
        return response;
      } catch (error) {
        throw error;
      }
}

export const verifyDownloadCode = async (downloadCode:string) => {
  try {
    const url = pathname + `/verify-download-code`;

    const response = await fetchApi().post(url, {downloadCode: downloadCode});

    return response;
  } catch (error) {
    throw error;
  }
}
