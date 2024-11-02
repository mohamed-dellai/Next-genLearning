
export function QuizQuestion({ data, onAnswer, isAnswered, isCorrect }) {
  console.log(data)
    return (
      <div className="mb-8 p-6 bg-white rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">{data.question}</h3>
        <div className="space-y-3">
          {data.options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                isAnswered
                  ? isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-100 text-gray-800'
                  : 'bg-gray-100 hover:bg-indigo-100'
              } ${isAnswered && 'cursor-default'}`}
              onClick={() => !isAnswered && onAnswer(index)}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }