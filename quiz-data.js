// 4つのJSONファイルをインポート
import asiaU1 from './asia-u_questions.json' assert { type: 'json' };
import asiaU2 from './asia-u-2_questions.json' assert { type: 'json' };
import general from './general_question.json' assert { type: 'json' };
import musashino from './musashino-city_questions.json' assert { type: 'json' };

// データ変換ヘルパー
function processQuizList(list, tagLabel) {
    return list.map(item => {
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

// すべてのクイズデータを1つの配列に結合してエクスポート
export const allQuizData = [
    ...processQuizList(asiaU1, "亜細亜大学"),
    ...processQuizList(asiaU2, "亜細亜大学"),
    ...processQuizList(general, "雑学・なぞなぞ"),
    ...processQuizList(musashino, "武蔵野市")
];