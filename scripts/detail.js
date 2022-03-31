const url = "https://restcountries.com/v3.1";
const detail = document.getElementById("detail");
let title = document.querySelector("title");
const back = document.querySelector("#back");

const queryString = window.location.search;
const nameParam = new URLSearchParams(queryString);
const name = nameParam.get("name");

title.innerText = name;

const destructure = (object) => {
	if (object) {
		let arr = [];
		for (let key in object) {
			arr.push(object[key]);
		}
		return arr;
	} else {
		return "none";
	}
};

const fetchCountry = async () => {
	try {
		const res = await fetch(`${url}/name/${name}?fullText=true`);
		detail.innerHTML = `
		<div class="d-flex justify-content-center pt-5">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		`;
		const data = await res.json();

		if (res.status === 200 && Array.isArray(data)) {
			console.log(data);
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
						tld,
						borders,
						altSpellings,
					} = country;

					const border = `<div class="d-flex align-items-md-center gap-2">
										${
											Array.isArray(borders)
												? borders
														.map((item) => {
															return `
												<a class="border-0 py-1-6 px-4 fs-14 shadow-sm rounded">${item}</a>
											`;
														})
														.join(" ")
												: ""
										}
													
								</div>`;

					return `
                    <div class='row align-items-center justify-content-between gy-4'>
                        <div class="col-lg-5 col-md-6"><img class="w-100 d-img" src='${png}' alt='${common}'></div>
                        <div class="col-lg-6 col-md-6">
							<h1 class='fs-3 fw-bold pb-3'>${common}</h1>
							<div class="d-flex flex-column flex-md-row gap-4 gap-md-0 justify-content-between">
								<div class="fs-14 fw-700">
									<p class='mb-1'>Native Name: <span class='fw-normal'>${
										altSpellings[1]
											? altSpellings[1]
											: common
									}</span></p>
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
								<div class="fs-14 fw-700">
									<p class='mb-1'>Top Level Domain: <span class='fw-normal'>${tld}</span></p>
									<p class='mb-1 text-capitalize'>Currencies: <span class='fw-normal'>${
										destructure(currencies)[0].name
									}</span></p>
									<p class='mb-1'>Languages: <span class='fw-normal'>${destructure(languages).map(
										(i) => " " + i
									)}</span></p>
								</div>
							</div>
							<div class="d-flex flex-md-row flex-column mt-4 fs-14 fw-700 align-items-md-center gap-md-3 gap-2">
								<p class="mb-0">Border Countries: </p>
								${borders ? border : "None"}
							</div>
						</div>
                    </div>
					`;
				})
				.join("");
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
