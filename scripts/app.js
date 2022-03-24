const countries = document.getElementById("countries-list");
const searchBox = document.getElementById("search-box");
const filter = document.querySelector(".filter");
const filterText = document.querySelector(".filter-text");
const region = document.querySelectorAll(".region");
const regionBox = document.querySelector(".region-box");
const mode = document.querySelector(".mode");
const body = document.querySelector("body");
let searchValue;
let list = [];

const url = "https://restcountries.com/v3.1";

const fetchCountries = async (urlPath) => {
	try {
		const res = await fetch(urlPath);
		countries.innerHTML = `
		<div class="d-flex justify-content-center pt-5">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		`;
		const data = await res.json();
list = data;
		if (res.status === 200) {
			countries.innerHTML = data
				.map((country) => {
					const {
						name: { common },
						region,
						flags: { png },
						capital,
						population,
					} = country;
					return `
						<a href="detail.html?name=${common}">
							<div class="w-300 shadow-sm rounded">
									<img src=${png} class='w-100 h-30 rounded-top object-fit'>
									<div class='bg-white boxer py-4 rounded-bottom px-4'>
										<h1 class='fs-16 fw-bold pb-2'>${common}</h1>
										<p class='fs-14 mb-0 fw-600'>Population: <span class='fw-normal'>${population
											.toString()
											.replace(
												/\B(?=(\d{3})+(?!\d))/g,
												","
											)}</span></p>
										<p class='fs-14 mb-0 fw-600 lh-0'>Region: <span class='fw-normal'>${region}</span></p>
										<p class='fs-14 fw-600'>Capital: <span class='fw-normal'>${
											capital ? capital : "None"
										}</span></p>
									</div>
							</div>
						</a>
					`;
				})
				.join("");
		} else {
			countries.innerHTML = `<p class='pt-5 display-5'>${data.message}</p>`;
		}
	} catch (err) {
		console.log(err);
	}
};

// initial fetch
window.onload = () => {
	fetchCountries(`${url}/all`);
};

// SEARCH FOR COUNTRY

searchBox.addEventListener("keypress", (e) => {
	searchValue = e.target.value;
	if (searchValue !== "") {
		if (e.keyCode === 13) {
			fetchCountries(`${url}/name/${searchValue}`);
		}
	}
});

// dropdown for region
filter.addEventListener("click", () => {
	regionBox.classList.toggle("dropdown");
});

// filter
region.forEach((item) => {
	item.addEventListener("click", (e) => {
		filterText.textContent = e.currentTarget.textContent;
		regionBox.classList.toggle("dropdown");
		fetchCountries(`${url}/region/${filterText.textContent}`);
		console.log("filtered");
	});
});

export {list};
