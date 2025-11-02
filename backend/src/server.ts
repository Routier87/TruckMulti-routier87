app.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }), (req, res) => {
  const user = req.user as any;
  const token = jwt.sign(
    { steamId: user.steamId, username: user.username },
    process.env.JWT_SECRET || 'devjwt',
    { expiresIn: '7d' }
  );

  res.send(`
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Connexion réussie</title>
        <style>
          body { font-family: Arial; background: #121212; color: #fff; text-align: center; margin-top: 50px; }
          pre { background: #222; padding: 10px; border-radius: 8px; display: inline-block; }
          button { margin-top: 15px; padding: 8px 16px; border: none; background: #007bff; color: #fff; border-radius: 6px; cursor: pointer; }
          button:hover { background: #0056b3; }
        </style>
      </head>
      <body>
        <h1>Connexion réussie ✅</h1>
        <p>Voici votre token JWT :</p>
        <pre id="t">${token}</pre><br/>
        <button onclick="copyToken()">📋 Copier dans le presse-papier</button>
        <p style="margin-top:20px;">
          <a href="http://localhost:5173/dashboard.html" style="color:#00aaff;">Retour au site</a>
        </p>
        <script>
          function copyToken() {
            const text = document.getElementById('t').innerText;
            navigator.clipboard.writeText(text).then(() => {
              alert('Token copié dans le presse-papier !');
            });
          }
        </script>
      </body>
    </html>
  `);
});
