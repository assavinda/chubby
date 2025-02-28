export function useImagePreloader() {
  const images = ref({});
  const loadedImages = ref(0);
  const totalImages = ref(0);
  const isLoaded = ref(false);

  function importAllImages() {
    const context = import.meta.glob("/public/images/**/*.{png,jpg,jpeg,webp,gif,svg}", {
      eager: true,
      as: "url",
    });

    totalImages.value = Object.keys(context).length;

    if (process.client) { 
      Object.keys(context).forEach((key) => {
        const imageName = key.replace("/public/images/", "").replace(/\//g, "-");
        const img = new Image();
        img.src = context[key];

        img.onload = () => {
          loadedImages.value++;
          if (loadedImages.value === totalImages.value) {
            isLoaded.value = true;
            console.log("✅ All Images Loaded Successfullyyyyyy");
          }
        };

        img.onerror = () => {
          console.error(`❌ Failed to load image: ${imageName}`);
        };

        images.value[imageName] = img.src;
      });
    } else {
      console.log("🚫 Skipping image preloading on server");
    }
  }

  importAllImages();

  return { images, isLoaded };
}
