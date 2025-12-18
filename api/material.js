export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { topic, format, notes } = req.query;
  
  let finalTopic = topic;
  let finalFormat = format;
  
  if (notes) {
    const match = notes.match(/topic=([^,]+),format=(\w+)/);
    if (match) {
      finalTopic = match[1];
      finalFormat = match[2];
    }
  }
  
  if (!finalTopic || !finalFormat) {
    return res.status(400).json({ error: 'Missing parameters', notes });
  }
  
  const materials = {
    "topic_geo7_ugol_text": "https://disk.yandex.ru/i/g_aEzKxBVYFzRw",
    "topic_geo7_ugol_video": "https://rutube.ru/video/private/c4573fa53d76e33d4783fe4100f755a1/?p=JA4kYXer1WqMx1dkhmz1cQ",
    "topic_alg7_stepeni_text": "https://disk.yandex.ru/i/98CpuXc-4tDmGg",
    "topic_alg7_stepeni_video": "https://rutube.ru/video/private/b5333fd31520b4997acd24750577e0e8/?p=pw65u8y4UmCYBaLFAwFUpA",
    "topic_alg8_drobi_text": "https://disk.yandex.ru/i/sOWc2ZxQnqZ9KQ",
    "topic_alg8_drobi_video": "https://rutube.ru/video/private/691d52b9f3320319769fc91ac71a6b19/?p=3CxPjpZnzgzEQjfCIxIpRw"
  };
  
  const key = `${finalTopic}_${finalFormat}`;
  const material = materials[key];
  
  if (!material) {
    return res.status(404).json({ error: 'Material not found', key });
  }
  
  // Если это video_hw формат - возвращаем обе ссылки текстом
  if (finalFormat === 'video_hw') {
    const videoHwMaterials = {
      "topic_geo7_ugol_video_hw": "Видео: https://rutube.ru/video/private/c4573fa53d76e33d4783fe4100f755a1/?p=JA4kYXer1WqMx1dkhmz1cQ\n\nДЗ: https://disk.yandex.ru/i/98OP0TIgyR7duw",
      "topic_alg7_stepeni_video_hw": "Видео: https://rutube.ru/video/private/b5333fd31520b4997acd24750577e0e8/?p=pw65u8y4UmCYBaLFAwFUpA\n\nДЗ: https://disk.yandex.ru/i/2ldigd5ujpOhgQ",
      "topic_alg8_drobi_video_hw": "Видео: https://rutube.ru/video/private/691d52b9f3320319769fc91ac71a6b19/?p=3CxPjpZnzgzEQjfCIxIpRw\n\nДЗ: https://disk.yandex.ru/i/ioQ6ri6LIFf9IQ"
    };
    return res.status(200).json({ link: videoHwMaterials[key] || "Не найдено", key });
  }
  
  return res.status(200).json({ link: material, key });
}
