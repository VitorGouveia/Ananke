const ghPages = require("gh-pages")

ghPages.publish(
  "public",
  {
    branch: "production",
    repo: "https://github.com/VitorGouveia/EtecJRM-SvelteApp.git",
    user: {
      name: "VitorGouveia",
      email: "vitor.gouveia@aluno.etecjrm.com.br"
    }
  },
  () => {
    console.log("Deploy compeleted!")
  }
)