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
        document.querySelectorAll('.mascot-character').forEach(mascot => {
            mascot.addEventListener('click', () => {
                this.mascotInteraction();
            });
        });
    }
    
    setupMascotAnimations() {
        // マスコットの表
