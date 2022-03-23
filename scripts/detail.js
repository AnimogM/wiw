const url = "https://restcountries.com/v3.1";
const detail = document.getElementById("detail");
let title = document.querySelector("title");
const back = document.querySelector("#back");

const queryString = window.location.search;
const nameParam = new URLSearchParams(queryString);
const name = nameParam.get("name");


const destructure = (object) => {
	if(object){
		for (let key in object) {
			// if (object.hasOwnProperty(key)) {
				console.log(object);
				return object[key]
			// } else {
			// 	return "none";
			// }
		}     
	} else {
		return "none"
	}
}

const fetchCountry = async () => {
	title = name;
	try {
		const res = await fetch(`${url}/name/${name}`);
		detail.innerHTML = `
		<div class="d-flex justify-content-center pt-5">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		`;
		const data = await res.json();
		console.log(data);
		if (res.status === 200) {
			detail.innerHTML = data
				.map((country) => {
					const {
						name: { common },
						region,
						subregion,
						flags: { png },
						capital,
						population,
						currencies,
						languages,
						tld
					} = country;

					return `
                    <div class='row align-items-center gy-5'>
                        <div class="col-lg-6 col-md-5"><img class="w-100" src='${png}' alt='${common}'></div>
                        <div class="col-lg-6 col-md-7">
							<h1 class='fs-3 fw-bold pb-3'>${common}</h1>
							<div class="row gy-5 justify-content-between">
								<div class="col-md-6 fs-14 fw-700">
									<p class='mb-1'>Native Name: <span class='fw-normal'>${region}</span></p>
									<p class='mb-1'>Population: <span class='fw-normal'>${population
										.toString()
										.replace(
											/\B(?=(\d{3})+(?!\d))/g,
											","
										)}</span></p>
									<p class='mb-1'>Region: <span class='fw-normal'>${region}</span></p>
									<p class='mb-1'>Sub Region: <span class='fw-normal'>${
										subregion ? subregion : "None"
									}</span></p>
									<p class='mb-1'>Capital: <span class='fw-normal'>${
										capital ? capital : "None"
									}</span></p>
								</div>
								<div class="col-md-6 fs-14 fw-700">
									<p class='mb-1'>Top Level Domain: <span class='fw-normal'>${tld}</span></p>
									<p class='mb-1 text-capitalize'>Currencies: <span class='fw-normal'>${
										destructure(currencies).name
									}</span></p>
									<p class='mb-1'>Languages: <span class='fw-normal'>${destructure(
										languages
									)}</span></p>
								</div>
							</div>
						</div>
                    </div>
					`;
				}).join("")
		} else {
			detail.innerHTML = `<p class='text-center pt-5 display-5'>${data.message}</p>`;
		}
	} catch (err) {
		console.log(err);
	}
};

fetchCountry();

// previous page
back.addEventListener("click", () => {
	history.back();
});
