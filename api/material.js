export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const { topic, format } = req.query;
  
  if (!topic || !format) {
    return res.status(400).json({ error: 'Missing topic or format parameter' });
  }
  
  const materials = {
    "topic_geo7_ugol_text": "https://disk.yandex.ru/i/g_aEzKxBVYFzRw",
    "topic_geo7_ugol_video": "https://rutube.ru/video/private/c4573fa53d76e33d4783fe4100f755a1/?p=JA4kYXer1WqMx1dkhmz1cQ",
    "topic_geo7_ugol_video_hw": {
      "video": "https://rutube.ru/video/private/c4573fa53d76e33d4783fe4100f755a1/?p=JA4kYXer1WqMx1dkhmz1cQ",
      "homework": "https://disk.yandex.ru/i/98OP0TIgyR7duw"
    },
    "topic_alg7_stepeni_text": "https://disk.yandex.ru/i/98CpuXc-4tDmGg",
    "topic_alg7_stepeni_video": "https://rutube.ru/video/private/b5333fd31520b4997acd24750577e0e8/?p=pw65u8y4UmCYBaLFAwFUpA",
    "topic_alg7_stepeni_video_hw": {
      "video": "https://rutube.ru/video/private/b5333fd31520b4997acd24750577e0e8/?p=pw65u8y4UmCYBaLFAwFUpA",
      "homework": "https://disk.yandex.ru/i/2ldigd5ujpOhgQ"
    },
    "topic_alg8_drobi_text": "https://disk.yandex.ru/i/sOWc2ZxQnqZ9KQ",
    "topic_alg8_drobi_video": "https://rutube.ru/video/private/691d52b9f3320319769fc91ac71a6b19/?p=3CxPjpZnzgzEQjfCIxIpRw",
    "topic_alg8_drobi_video_hw": {
      "video": "https://rutube.ru/video/private/691d52b9f3320319769fc91ac71a6b19/?p=3CxPjpZnzgzEQjfCIxIpRw",
      "homework": "https://disk.yandex.ru/i/ioQ6ri6LIFf9IQ"
    }
  };
  
  const key = `${topic}_${format}`;
  const material = materials[key];
  
  if (!material) {
    return res.status(404).json({ error: 'Material not found', key: key });
  }
  
  return res.status(200).json({ 
    link: material,
    key: key
  });
}
