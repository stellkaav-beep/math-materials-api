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
  
  // ФИКС: добавляем подчеркивания если их нет
  // topicgeo8mnogoprk -> topic_geo8_mnogoprk
  if (!finalTopic.includes('_')) {
    finalTopic = finalTopic
      .replace(/^topic/, 'topic_')  // topic -> topic_
      .replace(/(geo|alg)(\d+)/, '$1$2_');  // geo8 -> geo8_
  }
  
  const key = `${finalTopic}_${finalFormat}`;
  
  // video_hw проверка
  if (finalFormat === 'video_hw') {
    const videoHwMaterials = {
      "topic_geo7_ugol_video_hw": "Видео: https://disk.yandex.ru/i/ZCKBcyqWGTGyIw\n\nДЗ: https://disk.yandex.ru/i/d6xPM7dV9_sKZw",
      "topic_alg7_stepeni_video_hw": "Видео: https://disk.yandex.ru/i/4fGagOSYfxDIQw\n\nДЗ: https://disk.yandex.ru/i/-GtdgV322ACvBw",
      "topic_geo7_otrezok_video_hw": "Видео: https://disk.yandex.ru/i/oZE5Ufkg2rniRA\n\nДЗ: https://disk.yandex.ru/i/Cwvh3q-JjIBZsA",
      "topic_alg8_drobi_video_hw": "Видео: https://disk.yandex.ru/i/VEOxckIGqysMCQ\n\nДЗ: https://disk.yandex.ru/i/4o2Hh54A7E6sMg",
      "topic_alg8_drobiud_video_hw": "Видео: https://disk.yandex.ru/i/ORZjVM3bSB1DFw\n\nДЗ: https://disk.yandex.ru/i/GHt9xAqKXTh3RQ",
      "topic_geo8_mnogo_video_hw": "Видео: https://disk.yandex.ru/i/FRntWHvzRE9WEw\n\nДЗ: https://disk.yandex.ru/i/E_O9kg06wiKrOA",
      "topic_geo8_mnogoprk_video_hw": "Видео: https://disk.yandex.ru/i/KP7OuS37kRtM-Q\n\nДЗ: https://disk.yandex.ru/i/m2kBsWuEy2b3tA",
      "topic_alg7_chisl_video_hw": "Видео: https://disk.yandex.ru/i/BUHPkgm_0y7YZw\n\nДЗ: https://disk.yandex.ru/i/8kR1cynJ1sjOVg",
      "topic_alg7_stepeninatur_video_hw": "Видео: https://disk.yandex.ru/i/kY83OIBw285Z3A\n\nДЗ: https://disk.yandex.ru/i/-ZZ6UJVZNznXRA",
      "topic_alg8_drobislo_video_hw": "Видео: https://disk.yandex.ru/i/z5fS6Yiq84gqAA\n\nДЗ: https://disk.yandex.ru/i/uUwgYeOarMZpjw"
    };
    
    const material = videoHwMaterials[key];
    if (!material) {
      return res.status(404).json({ error: 'Material not found', key });
    }
    return res.status(200).json({ link: material, key });
  }
  
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
    "topic_alg7_stepeninatur_video": "https://disk.yandex.ru/i/kY83OIBw285Z3A",
    "topic_alg8_drobislo_text": "https://disk.yandex.ru/i/44B3Kb8fit8ZwQ",
    "topic_alg8_drobislo_video": "https://disk.yandex.ru/i/z5fS6Yiq84gqAA"
  };
  
  const material = materials[key];
  
  if (!material) {
    return res.status(404).json({ error: 'Material not found', key });
  }
  
  return res.status(200).json({ link: material, key });
}
