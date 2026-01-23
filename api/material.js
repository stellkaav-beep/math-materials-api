export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { topic, format, notes } = req.query;
  
  let finalTopic = topic;
  let finalFormat = format;
  
  if (notes) {
    const cleanNotes = notes.replace(/<\/?[^>]+(>|$)/g, "");
    const match = cleanNotes.match(/topic=([^,]+),format=(\w+)/);
    if (match) {
      finalTopic = match[1];
      finalFormat = match[2];
    }
  }
  
  if (!finalTopic || !finalFormat) {
    return res.status(400).json({ error: 'Missing parameters', notes });
  }
  
  const key = `${finalTopic}_${finalFormat}`;
  
  // СНАЧАЛА проверяем video_hw
  if (finalFormat === 'video_hw') {
    const videoHwMaterials = {
      "topic_geo7_ugol_video_hw": "Видео: https://disk.yandex.ru/i/ZCKBcyqWGTGyIw\n\nДЗ: https://disk.yandex.ru/i/d6xPM7dV9_sKZw",
      "topic_alg7_stepeni_video_hw": "Видео: https://disk.yandex.ru/i/4fGagOSYfxDIQw\n\nДЗ: https://disk.yandex.ru/i/SuKynhUcUxkn8Q",
      "topic_geo7_otrezok_video_hw": "Видео: https://disk.yandex.ru/i/oZE5Ufkg2rniRA\n\nДЗ: https://disk.yandex.ru/i/F1Wf8jkKISE_0Q",
      "topic_alg8_drobi_video_hw": "Видео: https://disk.yandex.ru/i/VEOxckIGqysMCQ\n\nДЗ: https://disk.yandex.ru/i/0GQVXI1uSIchkw",
      "topic_alg8_drobiud_video_hw": "Видео: https://disk.yandex.ru/i/ORZjVM3bSB1DFw\n\nДЗ: https://disk.yandex.ru/i/viE83dNpEbXvLg",
      "topic_geo8_mnogo_video_hw": "Видео: https://disk.yandex.ru/i/FRntWHvzRE9WEw\n\nДЗ: https://disk.yandex.ru/i/FvUpp9e1tj9XDQ",
      "topic_geo8_mnogoprk_video_hw": "Видео: https://disk.yandex.ru/i/KP7OuS37kRtM-Q\n\nДЗ: https://disk.yandex.ru/i/6bu986kLVHw9dw",
      "topic_alg7_chisl_video_hw": "Видео: https://disk.yandex.ru/i/BUHPkgm_0y7YZw\n\nДЗ: https://disk.yandex.ru/i/Du5OyB42O4ikwA",
      "topic_alg7_stepeninatur_video_hw": "Видео: https://disk.yandex.ru/i/kY83OIBw285Z3A\n\nДЗ: https://disk.yandex.ru/i/-ZZ6UJVZNznXRA"
    };
    
    const material = videoHwMaterials[key];
    if (!material) {
      return res.status(404).json({ error: 'Material not found', key });
    }
    return res.status(200).json({ link: material, key });
  }
  
  // Потом ищем в обычных materials
  const materials = {
    "topic_geo7_ugol_text": "https://disk.yandex.ru/i/asTmbAVA-JcoKw",
    "topic_geo7_ugol_video": "https://disk.yandex.ru/i/ZCKBcyqWGTGyIw",
    "topic_alg7_stepeni_text": "https://disk.yandex.ru/i/98CpuXc-4tDmGg",
    "topic_alg7_stepeni_video": "https://disk.yandex.ru/i/4fGagOSYfxDIQw",
    "topic_geo7_otrezok_text": "https://disk.yandex.ru/i/sUhuOqDxvfdINQ",
    "topic_geo7_otrezok_video": "https://disk.yandex.ru/i/oZE5Ufkg2rniRA",
    "topic_alg8_drobi_text": "https://disk.yandex.ru/i/DlTTrLd5_1YTww",
    "topic_alg8_drobi_video": "https://disk.yandex.ru/i/VEOxckIGqysMCQ",
    "topic_alg8_drobiud_text": "https://disk.yandex.ru/i/eCpwV_vI2sJiag",
    "topic_alg8_drobiud_video": "https://disk.yandex.ru/i/ORZjVM3bSB1DFw",
    "topic_geo8_mnogo_text": "https://disk.yandex.ru/i/VhYL_5E-390Srw",
    "topic_geo8_mnogo_video": "https://disk.yandex.ru/i/FRntWHvzRE9WEw",
    "topic_geo8_mnogoprk_text": "https://disk.yandex.ru/i/f8KXGtOMzOx_3Q",
    "topic_geo8_mnogoprk_video": "https://disk.yandex.ru/i/KP7OuS37kRtM-Q",
    "topic_alg7_chisl_text": "https://disk.yandex.ru/i/WUq5iWAIMRdiKw",
    "topic_alg7_chisl_video": "https://disk.yandex.ru/i/BUHPkgm_0y7YZw",
    "topic_alg7_stepeninatur_text": "https://disk.yandex.ru/i/0iuYA3t9-E8t7A",
    "topic_alg7_stepeninatur_video": "https://disk.yandex.ru/i/kY83OIBw285Z3A"
  };
  
  const material = materials[key];
  
  if (!material) {
    return res.status(404).json({ error: 'Material not found', key });
  }
  
  return res.status(200).json({ link: material, key });
}
