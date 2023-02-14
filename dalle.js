import { OpenAIApi, Configuration } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
    organization: process.env.ORG
});

const openai = new OpenAIApi(configuration);

export const handleDalleCommand = async (text) => {
  const options = {
    prompt: text,
    n: 1,
    size: "1024x1024",
  };

  try {
    const response = await openai.createImage(options);
    return response.data.data[0].url;
  } catch (e) {
      return handleError(e)
  }
};

export const handleDalleCommandEdit = async (text, img, mask) => {
  const options = {
    image: img,
    mask: mask,
    prompt: text,
    n: 1,
    size: "1024x1024"
  }

  try {
    const response = openai.Image.create_edit(options)
    const image_url = response['data'][0]['url']
    return image_url;
  } catch (e) {
    return handleError(e)
  }
}

export const handleDalleCommandVariation = async (img) => {
  const options = {
    image: img,
    n: 1,
    size: "1024x1024"
  }

  try {
    const response = openai.Image.create_variation(options)
    const image_url = response['data'][0]['url']
    return image_url;
  } catch (e) {
    return handleError(e)
  }
}


const handleError = (e) => {
  return `👷🏻‍♂️ OpenAI Response Error: ${e.response.data.error.message}`
}
