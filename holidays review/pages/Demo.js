import { Holiday } from "../components/holiday";
import { Carousel } from "../components/slider";
import { OffcanvasExample } from "../components/offMenu";

export function Demo() {
  return (
    <div>
      <OffcanvasExample />
      <div class="main-demo">
        <h1>Demo</h1>
        <p>This is how you can showcase your holidays on an easy format.</p>
        <p>
          Just Need a Name of place, a year and a highlight of your holiday so
          you can always remember what you took away with you.
        </p>
      </div>
      <div className="CC">
        <div class="card">
          <Holiday
            place="Vietnam"
            year="2026"
            highlight="I still think about the huge caves I visited and the calm of nature in Ninh Bihn"
          />
          <Carousel
            img1="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwNYw3WRpxb688RtSx0gOSyxgtvckI5Krj_LIcIfQKg&s=10"
            img2="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBOFgEAwVANXDlnqd4k3t3gEexDZWT7yUCG19YwXfXOg&s=10"
            img3="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/8e/7a/8e.jpg"
          />
        </div>
        <div class="card">
          <Holiday
            place="Sydney"
            year="2021-2024"
            highlight="Best four years of my life, I can't wait to visit and swim again in my favourite beaches"
          />
          <Carousel
            img1="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA4shxutUEOJ0TSG9aAX0Ija9Axnk9br3hErjFhQ-zdVN5vwG4cVJQPA0&s=10"
            img2="https://www.chosun.com/resizer/v2/KD5TMPTR3VAP5KARL2WYLM6UTI.png?auth=92e7fece823f2433cd12f89124b2ecb5096e42717b4f21991d4507d629f1a2bf&width=616"
            img3="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgU32mjNKiiIkmZV3hGHvc4cqPuQkYhFfCur0ffuouPA&s=10"
          />
        </div>
        <div class="card">
          <Holiday
            place="Vietnam"
            year="2026"
            highlight="I still think about the huge caves I visited and the calm of nature in Ninh Bihn"
          />
          <Carousel
            img1="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwNYw3WRpxb688RtSx0gOSyxgtvckI5Krj_LIcIfQKg&s=10"
            img2="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBOFgEAwVANXDlnqd4k3t3gEexDZWT7yUCG19YwXfXOg&s=10"
            img3="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/15/8e/7a/8e.jpg"
          />
        </div>
      </div>
    </div>
  );
}
