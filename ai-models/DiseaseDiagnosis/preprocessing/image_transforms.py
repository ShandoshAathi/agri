# Image Transforms and Preprocessing for Leaf Disease Vision Engine

import numpy as np
from PIL import Image
from Shared.config import DEFAULT_IMAGE_SIZE

def preprocess_leaf_image(image: Image.Image, target_size=DEFAULT_IMAGE_SIZE):
    """Resizes and normalizes leaf image for CNN input tensor."""
    resized_img = image.resize(target_size)
    img_array = np.array(resized_img, dtype=np.float32) / 255.0
    return img_array
