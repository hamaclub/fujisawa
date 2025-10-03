// アプリのメイン機能
class DisasterPreventionApp {
    constructor() {
        this.currentUser = {
            level: 5,
            points: 1250,
            streak: 12,
            badges: 8
        };
        
        this.quizData = [
            {
                question: "地震が発生した時、最初に取るべき行動は？",
                options: [
                    "すぐに外に逃げる",
                    "机の下に隠れる",
                    "火を消す",
                    "家族に連絡する"
                ],
                correct: 1,
                explanation: "地震の際は、まず身の安全を確保することが最優先です。机の下に隠れて頭を守りましょう。"
            },
            {
                question: "避難所で生活する際、最も重要なことは？",
                options: [
                    "快適な環境を作る",
                    "地域の人々と協力する",
                    "個人のプライバシーを守る",
                    "規則を守る"
                ],
                correct: 1,
                explanation: "避難所では多くの人が共同生活を送るため、地域の人々と協力することが重要です。"
            },
            {
                question: "台風が接近している時、事前に準備すべきものは？",
                options: [
                    "非常食と水",
                    "懐中電灯と電池",
                    "ラジオ",
                    "すべて"
                ],
                correct: 3,
                explanation: "台風対策では、非常食、水、懐中電灯、電池、ラジオなど、すべての防災用品を準備することが重要です。"
            }
        ];
        
        this.init();
    }
    
    init() {
        this.updateUserInfo();
        this.setupEventListeners();
        this.loadUserProgress();
    }
    
    updateUserInfo() {
        const levelElement = document.querySelector('.level-badge span');
        const pointsElement = document.querySelector('.points span');
        
        if (levelElement) {
            levelElement.textContent = `レベル ${this.currentUser.level}`;
        }
        
        if (pointsElement) {
            pointsElement.textContent = `${this.currentUser.points.toLocaleString()} ポイント`;
        }
    }
    
    setupEventListeners() {
        // ナビゲーション
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.switchTab(e.currentTarget);
            });
        });
        
        // メニューカード
        document.querySelectorAll('.menu-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const cardType = e.currentTarget.classList[1];
                this.handleMenuClick(cardType);
            });
        });
        
        // クイズオプション
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('option-btn')) {
                this.handleQuizAnswer(e.target);
            }
        });
    }
    
    switchTab(navItem) {
        // アクティブ状態を更新
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        navItem.classList.add('active');
        
        // タブに応じた処理
        const tabName = navItem.querySelector('span').textContent;
        console.log(`タブ切り替え: ${tabName}`);
    }
    
    handleMenuClick(cardType) {
        switch(cardType) {
            case 'quiz-card':
                this.openQuiz();
                break;
            case 'video-card':
                this.openVideos();
                break;
            case 'ar-card':
                this.openAR();
                break;
            case 'case-card':
                this.openCases();
                break;
        }
    }
    
    openQuiz() {
        const modal = document.getElementById('quizModal');
        modal.style.display = 'block';
        this.startQuiz();
    }
    
    closeQuiz() {
        const modal = document.getElementById('quizModal');
        modal.style.display = 'none';
    }
    
    startQuiz() {
        this.currentQuizIndex = 0;
        this.quizScore = 0;
        this.showQuizQuestion();
    }
    
    showQuizQuestion() {
        const question = this.quizData[this.currentQuizIndex];
        const questionElement = document.querySelector('.question h3');
        const optionsContainer = document.querySelector('.options');
        const progressElement = document.querySelector('.quiz-progress span');
        const progressBar = document.querySelector('.quiz-progress .progress');
        
        // 問題文を更新
        questionElement.textContent = question.question;
        
        // 進捗を更新
        const progress = ((this.currentQuizIndex + 1) / this.quizData.length) * 100;
        progressElement.textContent = `問題 ${this.currentQuizIndex + 1} / ${this.quizData.length}`;
        progressBar.style.width = `${progress}%`;
        
        // 選択肢を更新
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option;
            button.dataset.index = index;
            optionsContainer.appendChild(button);
        });
        
        // タイマーを開始
        this.startQuizTimer();
    }
    
    startQuizTimer() {
        let timeLeft = 30;
        const timerElement = document.querySelector('.quiz-timer span');
        
        this.timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `残り時間: ${timeLeft}秒`;
            
            if (timeLeft <= 0) {
                this.handleQuizTimeout();
            }
        }, 1000);
    }
    
    handleQuizAnswer(selectedButton) {
        clearInterval(this.timerInterval);
        
        const selectedIndex = parseInt(selectedButton.dataset.index);
        const correctIndex = this.quizData[this.currentQuizIndex].correct;
        
        // 正解・不正解の表示
        const options = document.querySelectorAll('.option-btn');
        options.forEach((option, index) => {
            option.disabled = true;
            if (index === correctIndex) {
                option.style.background = '#c6f6d5';
                option.style.borderColor = '#38a169';
            } else if (index === selectedIndex && selectedIndex !== correctIndex) {
                option.style.background = '#fed7d7';
                option.style.borderColor = '#e53e3e';
            }
        });
        
        if (selectedIndex === correctIndex) {
            this.quizScore++;
            this.showCorrectAnswer();
        } else {
            this.showIncorrectAnswer();
        }
        
        // 次の問題へ
        setTimeout(() => {
            this.nextQuizQuestion();
        }, 2000);
    }
    
    handleQuizTimeout() {
        clearInterval(this.timerInterval);
        this.showIncorrectAnswer();
        
        setTimeout(() => {
            this.nextQuizQuestion();
        }, 2000);
    }
    
    showCorrectAnswer() {
        // 正解時のフィードバック
        console.log('正解！');
    }
    
    showIncorrectAnswer() {
        // 不正解時のフィードバック
        console.log('不正解...');
    }
    
    nextQuizQuestion() {
        this.currentQuizIndex++;
        
        if (this.currentQuizIndex < this.quizData.length) {
            this.showQuizQuestion();
        } else {
            this.finishQuiz();
        }
    }
    
    finishQuiz() {
        const score = this.quizScore;
        const total = this.quizData.length;
        const percentage = Math.round((score / total) * 100);
        
        // スコアに応じてポイントを追加
        const pointsEarned = score * 50;
        this.currentUser.points += pointsEarned;
        this.updateUserInfo();
        
        // 結果表示
        alert(`クイズ完了！\n正解数: ${score}/${total} (${percentage}%)\n獲得ポイント: ${pointsEarned}`);
        
        this.closeQuiz();
    }
    
    openVideos() {
        // 動画コンテンツの表示
        console.log('動画コンテンツを開く');
        this.showVideoList();
    }
    
    showVideoList() {
        const videos = [
            {
                title: "地震の基礎知識",
                duration: "5:30",
                thumbnail: "📹",
                description: "地震が発生する仕組みと基本的な対策について学びましょう"
            },
            {
                title: "避難所での生活",
                duration: "8:15",
                thumbnail: "🏠",
                description: "避難所での生活のポイントとマナーについて"
            },
            {
                title: "台風対策",
                duration: "6:45",
                thumbnail: "🌀",
                description: "台風が来る前に準備すべきこと"
            }
        ];
        
        // 動画リストの表示（実際の実装では別のモーダルやページに表示）
        console.log('動画リスト:', videos);
    }
    
    openAR() {
        // AR体験の開始
        console.log('AR体験を開始');
        this.checkARSupport();
    }
    
    checkARSupport() {
        if ('xr' in navigator) {
            console.log('AR対応デバイスです');
            this.startARExperience();
        } else {
            alert('このデバイスはARに対応していません。スマートフォンでお試しください。');
        }
    }
    
    startARExperience() {
        // AR体験の実装（実際のARライブラリを使用）
        console.log('AR体験を開始します');
    }
    
    openCases() {
        // 藤沢市の防災事例紹介
        console.log('藤沢市の防災事例を表示');
        this.showFujisawaCases();
    }
    
    showFujisawaCases() {
        const cases = [
            {
                title: "藤沢市の防災訓練",
                description: "地域住民と連携した防災訓練の取り組み",
                image: "🏃‍♂️",
                date: "2024年3月"
            },
            {
                title: "避難所運営マニュアル",
                description: "効率的な避難所運営のためのマニュアル作成",
                image: "📋",
                date: "2024年2月"
            },
            {
                title: "防災アプリの活用",
                description: "市民向け防災情報アプリの導入事例",
                image: "📱",
                date: "2024年1月"
            }
        ];
        
        console.log('藤沢市の事例:', cases);
    }
    
    loadUserProgress() {
        // ユーザーの進捗を読み込み
        const savedProgress = localStorage.getItem('disasterPreventionProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            this.currentUser = { ...this.currentUser, ...progress };
            this.updateUserInfo();
        }
    }
    
    saveUserProgress() {
        // ユーザーの進捗を保存
        localStorage.setItem('disasterPreventionProgress', JSON.stringify(this.currentUser));
    }
}

// グローバル関数（HTMLから呼び出し用）
function openQuiz() {
    app.openQuiz();
}

function closeQuiz() {
    app.closeQuiz();
}

function openVideos() {
    app.openVideos();
}

function openAR() {
    app.openAR();
}

function openCases() {
    app.openCases();
}

// アプリの初期化
const app = new DisasterPreventionApp();

// ページ読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
    console.log('防災ゲームアプリが読み込まれました');
    
    // アニメーション効果
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// ウィンドウリサイズ時の処理
window.addEventListener('resize', () => {
    // レスポンシブ対応
    console.log('画面サイズが変更されました');
});

// ページ離脱時の処理
window.addEventListener('beforeunload', () => {
    app.saveUserProgress();
});
