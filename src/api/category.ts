import { fetchApi } from ".";
const pathname = "/category";

export const getAllCategories = async () => {
  try {
    const url = pathname + `/getAllParentCategory`;

    const response = await fetchApi().get(url);

    return response;
  } catch (error) {
    throw error;
  }
};

export const getByParentSlug = async (slug: string) => {
  try {
    const url = pathname + `/getByParentSlug/${slug}`;
    const response = await fetchApi().get(url);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryBySlug = async (slug = '') => {
    try {
      const url = pathname + `/getCategoryBySlug/${slug}`
      const response = await fetchApi().get(url)

      return response
    } catch (error) {
      console.log(error)
    }
}

export const searchCategory = async (search: string)=>{
  try {
    const url = `post/searchTitle?search=${search}`;
    const response = await fetchApi().get(url)
    return response
  } catch (error) {
    console.log(error);
    
  }
}
export const getHome = async () => {
  try {
    const url = pathname + `/getHome`;
    const response = await fetchApi().get(url);

    return response;
  } catch (error) {
    console.log(error);
  }
};
