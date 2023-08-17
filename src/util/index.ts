export const genClassNameProductItem = (index: number) => {
  let temp = index % 5;
  return `index${temp}`;
};

export const CATE_ICON = "https://tailieumienphi.info/upload/images/no-img.jpg";

export const genIndexValues = (length: number, index: number) => {
  const numDigits = length.toString().length;
  if (numDigits === 2 && index < 10) {
    return "0" + index.toLocaleString();
  } else if (numDigits === 3 && index < 10) {
    return "00" + index.toLocaleString();
  } else if (numDigits === 3 && index < 100) {
    return "0" + index.toLocaleString();
  } else {
    return index.toLocaleString();
  }
};

export const getGoogleDriveFileId = (url: string) => {
  const urlParts = url.split("/");
  return urlParts[5];
};
