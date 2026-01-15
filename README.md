# byMRH.az
🚀 byMRH - AI-Powered Personal Workspace

Live Demo: 

byMRH, fərdi məhsuldarlığı artırmaq üçün süni intellekt (AI) modelləri ilə təchiz olunmuş, hər tərəfli iş mühitidir. Bu platforma təqvim, qeydlər, tapşırıqlar və xəbərləri bir araya gətirməklə yanaşı, unikal AI Discussion (GemTalks) modulu ilə fərqlənir.


🌟 Əsas Modullar və Özəlliklər


🤖 GemTalks (AI Discussion Hub)

Layihənin ən innovativ hissəsi olan GemTalks, bir mövzu ətrafında bir neçə AI modelinin real-vaxt rejimində müzakirəsini təmin edir:

Multi-AI Collaboration: 1 Moderator AI tərəfindən idarə olunan 4 fərqli AI mütəxəssisi.

Real-time Audio: Fikirlər həm mətn, həm də səsli (TTS) şəkildə təqdim olunur.

Custom Rounds: İstifadəçi müzakirənin neçə raund davam edəcəyini təyin edir.

AI Summary: Müzakirənin sonunda moderator tərəfindən yekun xülasə təqdim edilir.


📅 Advanced Calendar System


Həm lokal, həm də qlobal idarəetmə:

Google Calendar Sync: İstənilən Google hesabı ilə OAuth2 inteqrasiyası.

Bidirectional Sync: Saytda yaradılan eventlər avtomatik Google Calendar-a, ordakılar isə sayta sinxronizasiya olunur.

FullCalendar Integration: Sürətli və interaktiv vizuallaşdırma.


📝 Smart Notes (Tiptap Rich-Text)


Qeydlərin strukturlaşdırılmış və vizual idarəedilməsi:

Rich Text Editing: Heading, list, bold, italic və s.

Media Support: Şəkillərin yüklənməsi və mətn daxilində yerləşdirilməsi.

Export to PDF: jspdf və html2canvas vasitəsilə qeydləri birbaşa PDF formatında yükləmə imkanı.


✅ Task Management


AI Task Generation: Süni intellekt vasitəsilə inputdan avtomatik task yaradılması.

Priority & Deadline: Tapşırıqların prioritetləşdirilməsi və son tarix təyini.

Auto-Cleanup: Vaxtı bitmiş taskların avtomatik idarəedilməsi.


📰 Dynamic News Feed


Multi-language Support: İstifadəçinin seçdiyi dilə uyğun xəbərlər.

Infinite Scroll: İlk 30 xəbər və "Load More" funksionallığı.

Smart Categorization: Xəbərlərin avtomatik kateqoriyalara bölünməsi



🛠 Texniki Stack


Frontend

Vite + React + TypeScript: Yüksək sürətli inkişaf və tip təhlükəsizliyi.

Redux Toolkit & RTK Query: Mürəkkəb state-lərin və API sorğularının idarəedilməsi.

Tailwind CSS & Framer Motion: Modern interfeys və hamar animasiyalar.

Lucide React: Minimalist və modern ikon dəsti.


Backend

Node.js (Express.js): Ölçeklenebilir server arxitekturası.

PostgreSQL & Sequelize ORM: Relasiyalı data strukturu (pgAdmin4 ilə idarə olunur).

JWT & Bcrypt: Təhlükəsiz autentifikasiya və parolların hash-lənməsi.

Multer: Şəkillərin və faylların idarəedilməsi.

Node-cron: 30 günlük "zibil qutusu" (soft delete) və digər planlı tapşırıqlar.

Google APIs & OAuth2: Google xidmətləri ilə tam inteqrasiya.



🗑 Zibil Qutusu Məntiqi

Sistemdə silinən datalar dərhal itmir. node-cron vasitəsilə qurulmuş sistem 30 gün boyunca datanı saxlayır və müddət bitdikdə avtomatik olaraq verilənlər bazasından tamamilə təmizləyir.


🧠 AI İnteqrasiyası

Layihənin 50%-i AI modellərinin backend-ə inteqrasiyası üzərində qurulub. Bu, yalnız mətn analizi deyil, həm də istifadəçi davranışına uyğun tapşırıqların yaradılması və çoxlu agentli (Multi-agent) müzakirələri əhatə edir.


🚀 Quraşdırma

Reponu klonlayın.

client və server qovluqlarında npm install əmrini icra edin.

.env faylında Google OAuth və PostgreSQL məlumatlarını daxil edin.

npm run dev (frontend) və npm start (backend) ilə layihəni başladın.



