import numpy as np
from PIL import Image

# 1. Clean pillow.png
p_path = r"D:\Work\pajama-avatar\public\merch\pillow.png"
img = Image.open(p_path).convert("RGBA")
arr = np.array(img)
# Erase top-left artifact above the pillows
# In arr[y, x]
arr[:140, :220, 3] = 0
cleaned_pillow = Image.fromarray(arr)
bbox = cleaned_pillow.getbbox()
if bbox:
    cleaned_pillow = cleaned_pillow.crop(bbox)
cleaned_pillow.save(p_path, optimize=True)
print("Pillow cleaned!")

# 2. Clean socks.png - erase faint white sleeve artifact in upper-left corner if desired, or smooth edges
s_path = r"D:\Work\pajama-avatar\public\merch\socks.png"
s_img = Image.open(s_path).convert("RGBA")
s_arr = np.array(s_img)
s_arr[:80, :150, 3] = 0
cleaned_socks = Image.fromarray(s_arr)
s_bbox = cleaned_socks.getbbox()
if s_bbox:
    cleaned_socks = cleaned_socks.crop(s_bbox)
cleaned_socks.save(s_path, optimize=True)
print("Socks cleaned!")

# 3. Clean toy.png - isolate the beautiful packaged handmade ornament on its white card
t_path = r"D:\Work\pajama-avatar\public\merch\toy.png"
t_img = Image.open(t_path).convert("RGBA")
t_arr = np.array(t_img)
# Remove the faint wood circular board artifact on the left (x < 360 and y > 300)
# and top-left faint wood
h, w = t_arr.shape[:2]
# The main card is on the right
# Let's clean out the background outside the card & hanging ornament
mask_left = t_arr[:, :320, 3] > 0
# If alpha is faint (< 180), erase
faint_mask = (t_arr[:, :, 3] < 120) & (t_arr[:, :, 3] > 0)
t_arr[faint_mask, 3] = 0
cleaned_toy = Image.fromarray(t_arr)
t_bbox = cleaned_toy.getbbox()
if t_bbox:
    cleaned_toy = cleaned_toy.crop(t_bbox)
cleaned_toy.save(t_path, optimize=True)
print("Toy cleaned!")
