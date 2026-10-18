import os
from io import BytesIO
from PIL import Image
from rembg import new_session, remove

INPUTS = [
    {
        "name": "shopper.png",
        "path": r"C:\Users\vlase\.gemini\antigravity\brain\cc0a1d8d-d90e-43aa-bf9a-01996533d906\.user_uploaded\media_1792339047506_a320b0a0.jpg",
    },
    {
        "name": "cup.png",
        "path": r"C:\Users\vlase\.gemini\antigravity\brain\cc0a1d8d-d90e-43aa-bf9a-01996533d906\.user_uploaded\media_1792339111671_86481dd1.png",
    },
    {
        "name": "pillow.png",
        "path": r"C:\Users\vlase\.gemini\antigravity\brain\cc0a1d8d-d90e-43aa-bf9a-01996533d906\.user_uploaded\media_1792339128798_dd83bb05.png",
    },
    {
        "name": "socks.png",
        "path": r"C:\Users\vlase\.gemini\antigravity\brain\cc0a1d8d-d90e-43aa-bf9a-01996533d906\.user_uploaded\media_1792339141616_d76e07ae.png",
    },
    {
        "name": "toy.png",
        "path": r"C:\Users\vlase\.gemini\antigravity\brain\cc0a1d8d-d90e-43aa-bf9a-01996533d906\.user_uploaded\media_1792339153241_372dfbcf.jpg",
    },
]

OUTPUT_DIR = r"D:\Work\pajama-avatar\public\merch"
os.makedirs(OUTPUT_DIR, exist_ok=True)

print("Initializing u2netp session...")
session = new_session("u2netp")

for item in INPUTS:
    src = item["path"]
    out_path = os.path.join(OUTPUT_DIR, item["name"])
    print(f"Processing {item['name']}...")
    
    with open(src, "rb") as f:
        img_bytes = f.read()
    
    nobg_bytes = remove(img_bytes, session=session)
    img = Image.open(BytesIO(nobg_bytes))
    
    bbox = img.getbbox()
    if bbox:
        w, h = img.size
        pad = int(min(w, h) * 0.04)
        left = max(0, bbox[0] - pad)
        top = max(0, bbox[1] - pad)
        right = min(w, bbox[2] + pad)
        bottom = min(h, bbox[3] + pad)
        cropped = img.crop((left, top, right, bottom))
    else:
        cropped = img
        
    max_dim = 800
    if max(cropped.size) > max_dim:
        cropped.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
        
    cropped.save(out_path, format="PNG", optimize=True)
    print(f"-> Saved {item['name']}! Dimensions: {cropped.size}")

print("ALL MERCH IMAGES PROCESSED SUCCESSFULLY!")
