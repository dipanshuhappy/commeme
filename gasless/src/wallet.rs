

use alloy::providers::{Provider, ProviderBuilder};

pub struct TransactionData {
    value: u128,
    data: String,
}

pub struct Wallet {
    rpc_url: String,
    provider: dyn Provider,
}

impl Wallet{
    pub fn new(rpc_url: &str) -> Self{
        let provider = ProviderBuilder::new().on_http(rpc_url);
        Self {
            rpc_url: rpc_url.to_string()
        }
    }

    
}

