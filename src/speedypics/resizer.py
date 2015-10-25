import base64
import cStringIO
from PIL import Image
from fractions import gcd


def resize_image(image, minimum_dimension=2):
    """Resize to the smallest possible version of this image"""
    original_width, original_height = image.size
    aspect_ratio = original_height * 1.0 / original_width

    print image.size
    print 'Aspect Ratio', aspect_ratio

    if aspect_ratio > 1:
        new_width = minimum_dimension
        new_height = int(new_width * aspect_ratio)
    else:
        new_height = minimum_dimension
        new_width = int(new_height / aspect_ratio)

    new_size = (new_width, new_height)
    print new_size
    small = image.resize(new_size, Image.ANTIALIAS)
    return small


def convert_to_base64(image):
    """Given a PIL instance, return the Base64 representation."""
    buffer = cStringIO.StringIO()
    image.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue())


if __name__ == '__main__':
    import time
    import sys

    path_to_image = sys.argv[1]
    image = Image.open(path_to_image)
    small = resize_image(image, minimum_dimension=3)

    with open('out.%s.png' % int(time.time()), 'wb') as out:
        small.save(out)

    print 'As base64:'
    print convert_to_base64(small)
