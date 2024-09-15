
const text = `<p>Lorem ipsum dolor sit amet. 
Eos repellendus illo qui repellendus esse rem ducimus quibusdam At quae labore et excepturi dolor et accusantium blanditiis. 
Qui nulla maxime ad repudiandae quam sit temporibus ipsum et aliquid quia est mollitia fugiat ea nihil Quis in vero internos. 
Aut neque perferendis aut laborum recusandae qui temporibus fugit. 
Est reprehenderit sunt est atque explicabo est velit suscipit et galisum aliquid ut magni incidunt ex autem galisum. 
Ab inventore voluptate eos dolorum corporis est debitis sequi et ipsa error? 
Rem accusamus deserunt id eius mollitia ut vero omnis! 
Et galisum voluptate nam architecto recusandae aut quam labore. 
Et nisi temporibus non sequi voluptatem ad labore sint qui impedit accusamus aut temporibus 
consequatur et tempora alias aut provident dolorum. Aut corrupti dolor hic dolor aperiam cum 
necessitatibus enim est eligendi illum. 
Id sint ullam ut nobis similique nam esse odio. 
Id quia consequatur aut dicta quidem eum doloremque debitis hic quibusdam labore rem ducimus optio hic architecto 
illo eum eius deserunt. Nam dolorem dolore rem amet tempore a asperiores error ut ipsam pariatur. 
Et enim fugiat eos consequuntur consequuntur eos commodi cumque quo voluptatum consequatur et necessitatibus 
fuga et tempore reprehenderit? In quam praesentium sed alias illo vel corporis numquam ut sunt assumenda id assumenda perferendis. 
Et voluptates quia est maxime iste est quasi dolorem id vitae provident est tempore laboriosam qui culpa dolorum. 
Ut iste nisi nam nostrum error ea molestiae dolores non distinctio inventore aut maiores voluptas qui nemo deserunt ex 
accusamus repellendus. Sed eius veritatis sit magnam sequi ex quod odio aut fugiat sunt cum expedita fugit. 
Est fugit illo aut molestias quisquam est harum debitis et veniam ipsam cum sint sequi. 
Et incidunt quam sed rerum repellendus in fuga quia eos officia placeat ad ullam totam et galisum eaque? 
Qui voluptatum repellat et ipsum modi vel galisum reiciendis aut aliquid illo est cupiditate iure aut adipisci libero 
ut corporis harum! Aut distinctio velit 33 similique labore est repellat quidem ab magnam voluptate. 
Et omnis eius hic consequatur natus aut ipsum asperiores et fuga impedit qui minima praesentium et iure consequatur 
et maxime assumenda! Hic voluptas eaque 33 neque sunt qui quae laboriosam. 
Aut accusantium beatae ad corporis inventore et quisquam aliquam ut omnis modi ut 
Quis dolor hic eligendi necessitatibus quo iusto sint. Est neque veniam est maxime corrupti aut facilis voluptatem! 
At eligendi ratione qui quas maiores ut quos expedita est molestiae doloribus. 
Et velit enim ab consequatur nulla et architecto similique et doloribus dolorum hic saepe odit ut sunt voluptatem 
aut praesentium voluptatem! Ut cupiditate explicabo et saepe totam id labore molestiae et laboriosam blanditiis 
est nemo blanditiis ut ipsam officiis. </p><p>Ut pariatur ullam ut facilis rerum ut ipsam porro sed odio exercitationem. 
Vel asperiores necessitatibus eum quis molestiae aut accusamus galisum. 
Est autem amet non expedita corrupti ea repudiandae quis aut nisi dolores et voluptatem illum qui soluta ratione. 
Et ratione voluptatibus et architecto quia qui impedit facilis vel voluptas galisum. 
Et officia numquam sed impedit enim nam quam quas vel Quis quasi qui cupiditate quae. 
Qui obcaecati accusamus et quis aliquid aut quasi corporis ex molestiae quia. 
Cum vitae quidem quo perferendis inventore ad voluptates excepturi ut facilis sint non voluptate odit eum exercitationem sunt.

`

const palavras = text.toLowerCase().split(/[\s,.!?"]+/).filter((palavra) => palavra);

let palavraContagem = {};
for (palavra of palavras) {
  if (palavraContagem[palavra]) {
    palavraContagem[palavra] += 1;
  } else {
    palavraContagem[palavra] = 1;
  }
}
 let palavraContagemArray = Object.entries(palavraContagem)
 let palavrasComMais6ocorrencias = []
 for(parChaveValor of palavraContagemArray){
    if(parChaveValor[1] >= 6){
        palavrasComMais6ocorrencias.push(parChaveValor[0])
    }
 }

function ordenacao(str1, str2){
    if(str1 > str2){
        return 1
    }
    if(str2 > str1){
        return -1
    }
    return 0
}
console.log(palavrasComMais6ocorrencias.sort(ordenacao));