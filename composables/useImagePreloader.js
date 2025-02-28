export function useImagePreloader() {
  const images = ref({});
  const loadedImages = ref(0);
  const totalImages = ref(0);
  const isLoaded = ref(false);
  const progress = ref(0)

  function importAllImages() {
    const context = import.meta.glob("/public/images/**/*.{png,jpg,jpeg,webp,gif,svg}", {
      eager: true,
      as: "url",
    });

    totalImages.value = Object.keys(context).length;

      Object.keys(context).forEach((key) => {
        const imageName = key.replace("/public/images/", "").replace(/\//g, "-");
        const img = new Image();
        img.src = context[key];

        img.onload = () => {
          loadedImages.value++;
          progress.value = Math.round((loadedImages.value / totalImages.value) * 100);
          console.log(progress.value)
          if (loadedImages.value === totalImages.value) {
            isLoaded.value = true;
            console.log("✅ All Images Loaded Successfully");
          }
        };

        img.onerror = () => {
          console.error(`❌ Failed to load image: ${imageName}`);
        };

        images.value[imageName] = img.src;
      });
  }

  importAllImages()

  return { images, isLoaded, progress };
}
