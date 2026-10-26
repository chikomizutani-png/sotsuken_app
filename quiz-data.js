// 各JSONファイルをテキストとして読み込み（JSONL対応）
import asiaU1Text from './asia-u_questions.json' with { type: 'text' };
import asiaU2Text from './asia-u-2_questions.json' with { type: 'text' };
import generalText from './general_question.json' with { type: 'text' };
import musashinoText from './musashino-city_questions.json' with { type: 'text' };

// 1行ずつのJSON文字をオブジェクト配列に変換する関数
function parseJsonLines(text, tagLabel) {
    if (!text) return [];
    return text
        .trim()
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith('//'))
        .map(line => {
            const item = JSON.parse(line);
            const correctIndex = item.answer_candidates.indexOf(item.answer_entity);
            return {
                qid: item.qid,
                question: item.question,
                choices: item.answer_candidates,
                correct: correctIndex !== -1 ? correctIndex : 0,
                tag: tagLabel
            };
        });
}

// すべてのクイズデータを結合してエクスポート
export const allQuizData = [
    ...parseJsonLines(asiaU1Text, "亜細亜大学"),
    ...parseJsonLines(asiaU2Text, "亜細亜大学"),
    ...parseJsonLines(generalText, "雑学・なぞなぞ"),
    ...parseJsonLines(musashinoText, "武蔵野市")
];