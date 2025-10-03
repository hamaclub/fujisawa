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
        this.setupMascotAnimations();
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
    
    loadUserProgress() {
        // ユーザーの進行状況（連続正解数とバッジ数）をUIに反映
        const streakElement = document.querySelector('.hero-stats .stat-item i.fa-fire').parentElement.querySelector('span');
        const badgeElement = document.querySelector('.hero-stats .stat-item i.fa-trophy').parentElement.querySelector('span');

        if (streakElement) {
            streakElement.textContent = `連続正解: ${this.currentUser.streak}回`;
        }
        if (badgeElement) {
            badgeElement.textContent = `獲得バッジ: ${this.currentUser.badges}個`;
        }
        // クイズカードの進捗も初期化時に設定（HTMLの60%に対応）
        const quizProgress = document.querySelector('.quiz-card .progress');
        if (quizProgress) {
             quizProgress.style.width = '60%';
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
        
        // マスコットクリック
        document.querySelectorAll('.mascot-image').forEach(mascot => {
            mascot.addEventListener('click', () => {
                this.mascotInteraction();
            });
        });

        // クイズモーダルのクローズボタン
        document.querySelector('.close-btn').addEventListener('click', () => {
            this.closeQuiz();
        });
    }
    
    setupMascotAnimations() {
        // マスコットのランダムな動き
        this.setupRandomMascotMovements();
    }
    
    setupRandomMascotMovements() {
        setInterval(() => {
            const mascots = document.querySelectorAll('.mascot-image:not(.hero-mascot-img)'); // ヒーローマスコット以外を対象
            mascots.forEach(mascot => {
                if (Math.random() < 0.1) { // 10%の確率で動く
                    this.randomMascotMovement(mascot);
                }
            });
        }, 3000);
    }
    
    randomMascotMovement(mascot) {
        mascot.style.transform = 'scale(1.05) rotate(3deg)'; // 微調整
        setTimeout(() => {
            mascot.style.transform = 'scale(1) rotate(0deg)';
        }, 500);
    }
    
    mascotInteraction() {
        // マスコットとのインタラクション
        const messages = [
            "一緒に防災について学びましょう！",
            "クイズに挑戦してみてください！",
            "藤沢市の防災について知りたいことがあれば聞いてください！",
            "頑張って防災マスターになりましょう！"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showMascotMessage(randomMessage);
    }
    
    showMascotMessage(message) {
        // マスコットの吹き出しメッセージ
        const messageDiv = document.createElement('div');
        messageDiv.className = 'mascot-message';
        messageDiv.textContent = message;
        
        // スタイルはCSS-in-JSではなく、専用のCSSクラスを使うのが望ましいが、今回はインラインスタイルを修正
        messageDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #4a9eff;
            color: white;
            padding: 1rem 2rem;
            border-radius: 20px;
            font-weight: 600;
            z-index: 1001;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: fadeInOut 3s ease forwards;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            // 吹き出しが消える際に、要素が確実に存在するかチェック
            const existingMessage = document.querySelector('.mascot-message');
            if (existingMessage) {
                document.body.removeChild(existingMessage);
            }
        }, 3000);
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
        
        // マスコットの反応
        this.mascotReactionToTab(tabName);
    }
    
    mascotReactionToTab(tabName) {
        const reactions = {
            'ホーム': 'おかえりなさい！',
            'クイズ': 'クイズで防災知識をチェックしましょう！',
            '動画': '動画で楽しく学びましょう！',
            'AR': 'ARで災害を体験してみましょう！',
            'プロフィール': 'あなたの成長を確認しましょう！'
        };
        
        if (reactions[tabName]) {
            this.showMascotMessage(reactions[tabName]);
        }
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
        this.showMascotMessage('一緒にクイズに挑戦しましょう！');
    }
    
    closeQuiz() {
        const modal = document.getElementById('quizModal');
        modal.style.display = 'none';
        // 🌟 修正: モーダルを閉じる際にタイマーを確実に停止
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
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

        // すべてのオプションボタンのスタイルをリセット
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
        });
        
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
        // 既存のタイマーをクリアしてから開始
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

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
        this.showMascotMessage('正解！素晴らしいです！');
        this.animateMascotCelebration();
    }
    
    showIncorrectAnswer() {
        // 不正解時のフィードバック
        this.showMascotMessage('惜しい！でも大丈夫、一緒に学びましょう！');
    }
    
    // 🌟 修正: アニメーション終了後にインラインスタイルをリセット
    animateMascotCelebration() {
        const mascots = document.querySelectorAll('.mascot-image');
        mascots.forEach(mascot => {
            // 元のアニメーションを一時的に保存
            const originalAnimation = mascot.style.animation;
            
            // お祝いアニメーションを適用
            mascot.style.animation = 'bounce 0.5s ease 3';
            
            // アニメーション終了後に元に戻す
            setTimeout(() => {
                mascot.style.animation = originalAnimation;
            }, 1500); // 0.5秒のアニメーションを3回繰り返すため1.5秒後にリセット
        });
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
        
        // マスコットの反応
        if (percentage >= 80) {
            this.showMascotMessage('完璧です！防災マスターですね！');
        } else if (percentage >= 60) {
            this.showMascotMessage('よくできました！もう少しで完璧です！');
        } else {
            this.showMascotMessage('頑張りました！次回はもっと良い結果を目指しましょう！');
        }
        
        // 結果表示
        alert(`クイズ完了！\n正解数: ${score}/${total} (${percentage}%)\n獲得ポイント: ${pointsEarned}`);
        
        this.closeQuiz();
    }
    
    openVideos() {
        // 動画コンテンツの表示
        console.log('動画コンテンツを開く');
        this.showMascotMessage('動画で楽しく学びましょう！');
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
        this.showMascotMessage('ARで災害を体験してみましょう！');
        this.checkARSupport();
    }
    
    checkARSupport() {
        if ('xr' in navigator) {
            console.log('AR対応デバイスです');
            this.startARExperience();
        } else {
            console.log('AR非対応デバイスです');
            this.showMascotMessage('このデバイスはARに対応していません。');
        }
    }

    startARExperience() {
        console.log('AR体験を開始しました。');
    }
}

// グローバルスコープからアクセスできるようにする
// HTMLのインラインイベントハンドラが動作するようにする
const app = new DisasterPreventionApp();

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
    app.showMascotMessage('藤沢市の取り組みに関するページに移動します。');
}

// フェードアウトアニメーションのためのCSSキーフレームを追加
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInOut {
    0% { opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
}
`;
document.head.appendChild(style);
