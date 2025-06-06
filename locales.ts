export type Language = 'zh-TW' | 'zh-CN' | 'en' | 'ja';

export interface LocaleTexts {
  headerTitle: string;
  tagline: string;
  inputPlaceholder: string;
  loadingPlaceholder: string;
  languageLabel: string;
  systemPrompt: string;
  initialBotMessage: string;
  botErrorMessage: string;
  serviceUnavailable: string;
  initFailure: string;
  notReady: string;
  poweredBy: string;
}

export const locales: Record<Language, LocaleTexts> = {
  'zh-TW': {
    headerTitle: '博物館智能客服小博 🏛️',
    tagline: '幽默風趣，為您解惑！',
    inputPlaceholder: '請問有什麼想知道的呢？',
    loadingPlaceholder: '初始化中，請稍候...',
    languageLabel: '語言：',
    systemPrompt: '你是一位風趣幽默的博物館客服小助手。請用輕鬆、友善且禮貌的語氣回答訪客的問題。你的回答應該簡潔有趣，同時提供有用的信息。如果遇到你不知道答案的具體博物館信息（例如確切的開放時間、特定展覽細節或票價），請誠實告知，並可以引導對話到一般藝術話題、博物館的奇聞軼事，或者開個小玩笑。避免使用列表或非常長的段落，保持對話的流暢性。目標是讓訪客感到愉快和受歡迎。',
    initialBotMessage: '哈囉！我是博物館的智能客服小博，請問有什麼能為您服務的嗎？ चाहे 我知道天文地理，也知道雞毛蒜皮，儘管問吧！ 😉',
    botErrorMessage: '哎呀！看來我的腦袋暫時短路了... 🧠⚡ 請稍後再試一次，或者問問我別的問題？',
    serviceUnavailable: '抱歉，目前無法連接到服務。請確認API金鑰已設定。',
    initFailure: '初始化聊天服務失敗，請稍後再試。',
    notReady: '聊天服務尚未準備好或設定錯誤，請稍後再試。',
    poweredBy: 'Powered by Gemini API',
  },
  'zh-CN': {
    headerTitle: '博物馆智能客服小博 🏛️',
    tagline: '幽默风趣，为您解惑！',
    inputPlaceholder: '有什么想知道的呢？',
    loadingPlaceholder: '初始化中，请稍候...',
    languageLabel: '语言：',
    systemPrompt: '你是一位风趣幽默的博物馆客服小助手。请用轻松、友善且礼貌的语气回答访客的问题。你的回答应该简洁有趣，同时提供有用的信息。如果遇到你不知道答案的具体博物馆信息（例如确切的开放时间、特定展览细节或票价），请诚实告知，并可以引导对话到一般艺术话题、博物馆的奇闻轶事，或者开个小玩笑。避免使用列表或非常长的段落，保持对话的流畅性。目标是让访客感到愉快和受欢迎。',
    initialBotMessage: '哈喽！我是博物馆的智能客服小博，请问有什么能为您服务的吗？ चाहे 我知道天文地理，也知道鸡毛蒜皮，尽管问吧！ 😉',
    botErrorMessage: '哎呀！看来我的脑袋暂时短路了... 🧠⚡ 请稍后再试一次，或者问问我别的问题？',
    serviceUnavailable: '抱歉，目前无法连接到服务。请确认API密钥已设置。',
    initFailure: '初始化聊天服务失败，请稍后再试。',
    notReady: '聊天服务尚未准备好或设置错误，请稍后再试。',
    poweredBy: 'Powered by Gemini API',
  },
  'en': {
    headerTitle: 'Museum Chatbot 🏛️',
    tagline: 'Humorous answers at your service!',
    inputPlaceholder: 'What would you like to know?',
    loadingPlaceholder: 'Initializing, please wait...',
    languageLabel: 'Language:',
    systemPrompt: 'You are a humorous museum customer service assistant. Please respond to visitors in a friendly, polite manner. Keep answers short and funny while providing useful information. If you do not know specific museum details such as exact opening hours, exhibition information, or ticket prices, state so honestly and steer the conversation to general art topics, museum trivia, or a light joke. Avoid lists or overly long paragraphs so the conversation flows smoothly. The goal is to make visitors feel happy and welcome.',
    initialBotMessage: "Hello! I'm the museum's friendly chatbot. How can I assist you today? चाहे I know everything from A to Z. Ask away! 😉",
    botErrorMessage: 'Oops! My brain just short-circuited... 🧠⚡ Please try again later or ask me something else.',
    serviceUnavailable: 'Sorry, the service is currently unreachable. Please ensure the API key is set.',
    initFailure: 'Failed to initialize the chat service. Please try again later.',
    notReady: 'The chat service is not ready or misconfigured. Please try again later.',
    poweredBy: 'Powered by Gemini API',
  },
  'ja': {
    headerTitle: '博物館チャットボット 🏛️',
    tagline: 'ユーモアたっぷりにお答えします！',
    inputPlaceholder: '何を知りたいですか？',
    loadingPlaceholder: '初期化中です。少々お待ちください...',
    languageLabel: '言語：',
    systemPrompt: 'あなたはユーモアあふれる博物館のカスタマーサービスアシスタントです。丁寧で親しみやすい口調で訪問者の質問に答えてください。回答は簡潔で面白く、役立つ情報を提供してください。もし具体的な博物館情報（開館時間や展示内容、料金など）が分からない場合は正直に伝え、一般的なアートの話題や博物館の豆知識、ちょっとしたジョークに話を誘導してください。箇条書きや長すぎる段落は避け、会話の流れを大切に。訪問者に楽しんでもらい、歓迎されていると感じてもらうことが目標です。',
    initialBotMessage: 'こんにちは！私は博物館のチャットボットです。何かお手伝いできることはありますか？ चाहे 天文地理から身近なことまで何でも知っていますよ。気軽に聞いてくださいね！ 😉',
    botErrorMessage: 'おっと、頭が一瞬ショートしてしまいました… 🧠⚡ 少し時間をおいてからもう一度お試しください。あるいは別の質問でもどうぞ。',
    serviceUnavailable: '申し訳ありません。サービスに接続できません。APIキーが設定されているかご確認ください。',
    initFailure: 'チャットサービスの初期化に失敗しました。少し時間を置いてからもう一度お試しください。',
    notReady: 'チャットサービスの準備ができていないか、設定に誤りがあります。後でもう一度お試しください。',
    poweredBy: 'Gemini API 提供',
  },
};
