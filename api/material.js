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
      "topic_geo7_ugol_video_hw": "Видео: https://disk.yandex.ru/i/ZCKBcyqWGTGyIw\n\nДЗ: https://disk.yandex.ru/i/7lSeKDjy6ivCmA",
      "topic_alg7_stepeni_video_hw": "Видео: https://disk.yandex.ru/i/4fGagOSYfxDIQw\n\nДЗ: https://disk.yandex.ru/i/SuKynhUcUxkn8Q",
      "topic_alg8_drobi_video_hw": "Видео: https://rutube.ru/video/private/691d52b9f3320319769fc91ac71a6b19/?p=3CxPjpZnzgzEQjfCIxIpRw\n\nДЗ: https://disk.yandex.ru/i/ioQ6ri6LIFf9IQ",
      "topic_geo7_otrezok_video_hw": "Видео: https://disk.yandex.ru/i/oZE5Ufkg2rniRA\n\nДЗ: https://disk.yandex.ru/i/F1Wf8jkKISE_0Q"
    };
    
    const material = videoHwMaterials[key];
    if (!material) {
      return res.status(404).json({ error: 'Material not found', key });
    }
    return res.status(200).json({ link: material, key });
  }
  
  // Потом ищем в обычных materials
  const materials = {
    "topic_geo7_ugol_text": "https://disk.yandex.ru/i/g_aEzKxBVYFzRw",
    "topic_geo7_ugol_video": "https://disk.yandex.ru/i/ZCKBcyqWGTGyIw",
    "topic_alg7_stepeni_text": "https://disk.yandex.ru/i/98CpuXc-4tDmGg",
    "topic_alg7_stepeni_video": "https://disk.yandex.ru/i/4fGagOSYfxDIQw",
    "topic_alg8_drobi_text": "https://disk.yandex.ru/i/sOWc2ZxQnqZ9KQ",
    "topic_alg8_drobi_video": "https://rutube.ru/video/private/691d52b9f3320319769fc91ac71a6b19/?p=3CxPjpZnzgzEQjfCIxIpRw",
    "topic_geo7_otrezok_text": "https://disk.yandex.ru/i/sUhuOqDxvfdINQ",
    "topic_geo7_otrezok_video": "https://disk.yandex.ru/i/oZE5Ufkg2rniRA"
  };
  
  const material = materials[key];
  
  if (!material) {
    return res.status(404).json({ error: 'Material not found', key });
  }
  
  return res.status(200).json({ link: material, key });
}
