export class App {

    constructor() {

        this.container = document.querySelector("#app");

    }

    start() {

        this.container.innerHTML = `

<div class="container-fluid">

<div class="row">

<div class="col-12 bg-primary text-white p-3">

<h2>

🧬 Human Nutrition Atlas

</h2>

</div>

</div>

<div class="row vh-100">

<div class="col-2 border-end p-3">

<h5>

Search

</h5>

<input
class="form-control"
placeholder="Search..."
>

<hr>

<h5>

Filters

</h5>

<div>

<input checked type="checkbox">

Vitamins

</div>

<div>

<input checked type="checkbox">

Minerals

</div>

<div>

<input checked type="checkbox">

Organs

</div>

<div>

<input checked type="checkbox">

Hormones

</div>

</div>

<div class="col-7">

<div id="cy"></div>

</div>

<div class="col-3 border-start p-3">

<h4>

Details

</h4>

<div id="details">

Select a node

</div>

</div>

</div>

</div>

`;

    }

}