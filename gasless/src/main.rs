mod wallet;
use rocket::{get, routes,post};


#[post("/transaction",format = "application/json", data = "<transaction_data>")]
fn transaction(transaction_data: wallet::) -> &'static str {
    "Hello, world!"
    
}

#[shuttle_runtime::main]
async fn main() -> shuttle_rocket::ShuttleRocket {
    let rocket = rocket::build().mount("/", routes![index]);

    Ok(rocket.into())
}
