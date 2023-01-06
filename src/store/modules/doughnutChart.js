
const state = {
    queries: {
        'top': {
            result: null,
            sql: `with yy as
            (select 
            count(*) as number, 
            PROJECT_NAME , date_trunc('day',BLOCK_TIMESTAMP) as date
            from 
            ethereum.core.ez_nft_mints
              where
              PROJECT_NAME ='' or PROJECT_NAME in ('gods_unchained','ens','enjin','crypto_dozer','crypto kities','codex record'
              ,'Gods Unchained Cards','sorare','sorare')
            group by PROJECT_NAME,date
              order by number desc
            )
            
            select 
            case when PROJECT_NAME is null then 'no name' else PROJECT_NAME end as PROJECT_NAME ,
            number ,date
            from 
            yy
            `
        },

        'seals': {
            result: null,
            sql: `select 
            count(*) as number, 
            sum(PRICE_USD) as volume, 
            PLATFORM_NAME, 
              date_trunc('day',BLOCK_TIMESTAMP ) as date
            from 
            ethereum.core.ez_nft_sales
            group by PLATFORM_NAME,date            
            `
        },
        //bridge
        'bridge5': {
            result: null,
            sql: `with prices as (
                SELECT date(HOUR) as day, symbol, token_address, decimals, min(price) as avg_price
                from ethereum.core.fact_hourly_token_prices
                where SYMBOL not in ('DG', 'BORING')
                GROUP by day, token_address, symbol, decimals
              ),
              all_data as (
                  select *
                  from (
                  select date_trunc('month', a.BLOCK_TIMESTAMP) as day,
                  case when TO_ADDRESS in ('0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0', '0x8eb8a3b98659cce290402893d0123abb75e3ab28') then 'Avalanche Bridge'
                    when TO_ADDRESS = '0xf92cd566ea4864356c5491c177a430c222d7e678' then 'Solana Wormhole'
                    when TO_ADDRESS = '0x23ddd3e3692d1861ed57ede224608875809e127f' then 'Near Rainbow Bridge'
                    when TO_ADDRESS = '0x2dccdb493827e15a5dc8f8b72147e6c4a5620857' then 'Harmony Bridges'
                    when TO_ADDRESS = '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe' then 'Fantom Anyswap Bridge'
                    when TO_ADDRESS in ('0x40ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf', '0x401f6c983ea34274ec46f84d70b31c151321188b' )then 'Polygon Bridges'
                    when TO_ADDRESS in ('0x467194771dae2967aef3ecbedd3bf9a310c76c65', '0x99c9fc46f92e8a1c0dec1b1747d010903e884be1', '0x5fd79d46eba7f351fe49bff9e87cdea6c821ef9f' )then 'Optimism Bridges'
                    when TO_ADDRESS in ('0xcee284f754e854890e311e3280b767f80797180d', '0xa3a7b6f88361f48403514059f1f16c8e78d60eec', '0x4dbd4fc535ac27206064b68ffcf827b0a60bab3f') then 'Arbitrum Bridges'
                
                    when TO_ADDRESS in ('0x88ad09518695c6c3712ac10a214be5109a655671', '0x4aa42145aa6ebf72e164c9bbc74fbd3788045016') then 'Gnosis: xDAI Bridges'
                    when TO_ADDRESS in ('0x6a39909e805a3eadd2b61fff61147796ca6abb47') then 'Optics Bridge'
                    when TO_ADDRESS in ('0x533e3c0e6b48010873b947bddc4721b1bdff9648') then 'BSC Anyswap Bridge'
              
                    when TO_ADDRESS in ('0x10c6b61dbf44a083aec3780acf769c77be747e23') then 'Moonriver Anyswap Bridge'
                    when TO_ADDRESS in ('0x12ed69359919fc775bc2674860e8fe2d2b6a7b5d') then 'RSK Token Bridge'
                    when TO_ADDRESS in ('0xabea9132b05a70803a4e85094fd0e1800777fbef') then 'ZkSync Bridge'
                    when TO_ADDRESS in ('0xdc1664458d2f0b6090bea60a8793a4e66c2f1c00') then 'Boba Network Bridge'
              
                    when TO_ADDRESS in ('0x1a2a1c938ce3ec39b6d47113c7955baa9dd454f2', '0x64192819ac13ef72bf6b5ae239ac672b43a9af08') then 'Axie Infinity: Ronin Bridge'
                    when TO_ADDRESS in ('0x2796317b0ff8538f253012862c06787adfb8ceb6') then 'Synapse Bridge'
                    when TO_ADDRESS in ('0x88a69b4e698a4b090df6cf5bd7b2d47325ad30a3') then 'Nomad Bridge'
                
                  end as bridge,
                    token_address, t.symbol, sum(RAW_AMOUNT/pow(10, decimals) * avg_price) as token_amount, decimals, COUNT(DISTINCT ORIGIN_FROM_ADDRESS) as users, COUNT(DISTINCT tx_hash) as tx_count
                
                  from ethereum.core.fact_token_transfers a
                  join prices t on t.token_address = a.CONTRACT_ADDRESS and date_trunc('day', a.BLOCK_TIMESTAMP) = t.day
                  where TO_ADDRESS in ('0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0', '0x8eb8a3b98659cce290402893d0123abb75e3ab28', -- avalanche
                                      '0xf92cd566ea4864356c5491c177a430c222d7e678', -- solana wormhole
                '0x23ddd3e3692d1861ed57ede224608875809e127f', -- near
                '0x2dccdb493827e15a5dc8f8b72147e6c4a5620857', --harmony
                '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe', -- fantom
                '0x40ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf', '0x401f6c983ea34274ec46f84d70b31c151321188b', -- polygon
                '0x467194771dae2967aef3ecbedd3bf9a310c76c65', '0x99c9fc46f92e8a1c0dec1b1747d010903e884be1', '0x5fd79d46eba7f351fe49bff9e87cdea6c821ef9f', -- optimism
                '0xcee284f754e854890e311e3280b767f80797180d', '0xa3a7b6f88361f48403514059f1f16c8e78d60eec', '0x4dbd4fc535ac27206064b68ffcf827b0a60bab3f', -- arbitrum
                '0x88ad09518695c6c3712ac10a214be5109a655671', '0x4aa42145aa6ebf72e164c9bbc74fbd3788045016', --xdai
                '0x6a39909e805a3eadd2b61fff61147796ca6abb47', -- celo
                '0x533e3c0e6b48010873b947bddc4721b1bdff9648', -- bsc
                '0x10c6b61dbf44a083aec3780acf769c77be747e23', -- moon
                '0x12ed69359919fc775bc2674860e8fe2d2b6a7b5d', -- rsk
                '0xabea9132b05a70803a4e85094fd0e1800777fbef', -- zksync
                '0xdc1664458d2f0b6090bea60a8793a4e66c2f1c00', -- boba
                '0x1a2a1c938ce3ec39b6d47113c7955baa9dd454f2', '0x64192819ac13ef72bf6b5ae239ac672b43a9af08', --ronin
                '0x2796317b0ff8538f253012862c06787adfb8ceb6', -- synapse
                '0x88a69b4e698a4b090df6cf5bd7b2d47325ad30a3' -- nomad
                )
                and RAW_AMOUNT/pow(10, decimals) * avg_price > 0 and RAW_AMOUNT/pow(10, decimals) * avg_price < 5000000000
                group by 1, 2, 3, 4, 6
                order by 1
                )
              )
              select day as date, bridge, sum(token_amount) as tvl, sum(users) as users, sum(tx_count) as tx_count,
                  avg(tvl) OVER(partition by bridge ORDER BY day ROWS BETWEEN 7 PRECEDING AND CURRENT ROW ) as ma_7day
              from all_data 
                where users > 20
                group by 1,2            
            `
        }, 


        'bridge6': {
            result: null,
            sql: `with prices as (
                SELECT date(HOUR) as day, symbol, token_address, decimals, avg(price) as avg_price
                from ethereum.core.fact_hourly_token_prices
                where SYMBOL not in ('DG', 'BORING') -- wrong prices
                GROUP by day, token_address, symbol, decimals
              ),
              all_data as (
                  select *
                  from (
                  select date_trunc('month', a.BLOCK_TIMESTAMP) as day,
                  case when FROM_ADDRESS in ('0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0', '0x8eb8a3b98659cce290402893d0123abb75e3ab28') then 'Avalanche Bridge'
                    when FROM_ADDRESS = '0xf92cd566ea4864356c5491c177a430c222d7e678' then 'Solana Wormhole'
                    when FROM_ADDRESS = '0x23ddd3e3692d1861ed57ede224608875809e127f' then 'Near Rainbow Bridge'
                    when FROM_ADDRESS = '0x2dccdb493827e15a5dc8f8b72147e6c4a5620857' then 'Harmony Bridges'
                    when FROM_ADDRESS = '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe' then 'Fantom Anyswap Bridge'
                    when FROM_ADDRESS in ('0x40ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf', '0x401f6c983ea34274ec46f84d70b31c151321188b' )then 'Polygon Bridges'
                    when FROM_ADDRESS in ('0x467194771dae2967aef3ecbedd3bf9a310c76c65', '0x99c9fc46f92e8a1c0dec1b1747d010903e884be1', '0x5fd79d46eba7f351fe49bff9e87cdea6c821ef9f' )then 'Optimism Bridges'
                    when FROM_ADDRESS in ('0xcee284f754e854890e311e3280b767f80797180d', '0xa3a7b6f88361f48403514059f1f16c8e78d60eec', '0x4dbd4fc535ac27206064b68ffcf827b0a60bab3f') then 'Arbitrum Bridges'
                
                    when FROM_ADDRESS in ('0x88ad09518695c6c3712ac10a214be5109a655671', '0x4aa42145aa6ebf72e164c9bbc74fbd3788045016') then 'Gnosis: xDAI Bridges'
                    when FROM_ADDRESS in ('0x6a39909e805a3eadd2b61fff61147796ca6abb47') then 'Optics Bridge'
                    when FROM_ADDRESS in ('0x533e3c0e6b48010873b947bddc4721b1bdff9648') then 'BSC Anyswap Bridge'
              
                    when FROM_ADDRESS in ('0x10c6b61dbf44a083aec3780acf769c77be747e23') then 'Moonriver Anyswap Bridge'
                    when FROM_ADDRESS in ('0x12ed69359919fc775bc2674860e8fe2d2b6a7b5d') then 'RSK Token Bridge'
                    when FROM_ADDRESS in ('0xabea9132b05a70803a4e85094fd0e1800777fbef') then 'ZkSync Bridge'
                    when FROM_ADDRESS in ('0xdc1664458d2f0b6090bea60a8793a4e66c2f1c00') then 'Boba Network Bridge'
              
                    when FROM_ADDRESS in ('0x1a2a1c938ce3ec39b6d47113c7955baa9dd454f2', '0x64192819ac13ef72bf6b5ae239ac672b43a9af08') then 'Axie Infinity: Ronin Bridge'
                    when FROM_ADDRESS in ('0x2796317b0ff8538f253012862c06787adfb8ceb6') then 'Synapse Bridge'
                    when FROM_ADDRESS in ('0x88a69b4e698a4b090df6cf5bd7b2d47325ad30a3') then 'Nomad Bridge'
                
                  end as bridge,
                  token_address, t.symbol, sum(RAW_AMOUNT/pow(10, decimals) * avg_price) as token_amount, decimals,  COUNT(DISTINCT ORIGIN_FROM_ADDRESS) as users, COUNT(DISTINCT tx_hash) as tx_count
                
                  from ethereum.core.fact_token_transfers a
                  join prices t on t.token_address = a.CONTRACT_ADDRESS and date_trunc('day', a.BLOCK_TIMESTAMP) = t.day
                  where FROM_ADDRESS in ('0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0', '0x8eb8a3b98659cce290402893d0123abb75e3ab28', -- avalanche
                                      '0xf92cd566ea4864356c5491c177a430c222d7e678', -- solana wormhole
                '0x23ddd3e3692d1861ed57ede224608875809e127f', -- near
                '0x2dccdb493827e15a5dc8f8b72147e6c4a5620857', --harmony
                '0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe', -- fantom
                '0x40ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf', '0x401f6c983ea34274ec46f84d70b31c151321188b', -- polygon
                '0x467194771dae2967aef3ecbedd3bf9a310c76c65', '0x99c9fc46f92e8a1c0dec1b1747d010903e884be1', '0x5fd79d46eba7f351fe49bff9e87cdea6c821ef9f', -- optimism
                '0xcee284f754e854890e311e3280b767f80797180d', '0xa3a7b6f88361f48403514059f1f16c8e78d60eec', '0x4dbd4fc535ac27206064b68ffcf827b0a60bab3f', -- arbitrum
                '0x88ad09518695c6c3712ac10a214be5109a655671', '0x4aa42145aa6ebf72e164c9bbc74fbd3788045016', --xdai
                '0x6a39909e805a3eadd2b61fff61147796ca6abb47', -- celo
                '0x533e3c0e6b48010873b947bddc4721b1bdff9648', -- bsc
                '0x10c6b61dbf44a083aec3780acf769c77be747e23', -- moon
                '0x12ed69359919fc775bc2674860e8fe2d2b6a7b5d', -- rsk
                '0xabea9132b05a70803a4e85094fd0e1800777fbef', -- zksync
                '0xdc1664458d2f0b6090bea60a8793a4e66c2f1c00', -- boba
                '0x1a2a1c938ce3ec39b6d47113c7955baa9dd454f2', '0x64192819ac13ef72bf6b5ae239ac672b43a9af08', --ronin
                '0x2796317b0ff8538f253012862c06787adfb8ceb6', -- synapse
                '0x88a69b4e698a4b090df6cf5bd7b2d47325ad30a3' -- nomad
                )
                  and RAW_AMOUNT/pow(10, decimals) * avg_price > 0 and RAW_AMOUNT/pow(10, decimals) * avg_price < 5000000000
                  group by 1, 2, 3, 4, 6
                  order by 1
                  )
              )
              select day as date, bridge, sum(token_amount) as tvl, sum(users) as users, sum(tx_count) as tx_count,
                  avg(tvl) OVER(partition by bridge ORDER BY day ROWS BETWEEN 7 PRECEDING AND CURRENT ROW ) as ma_7day
              from all_data group by 1,2       
            `
        },

    },

};

const getters = {
    getQueries(state) {
        return state.queries;
    },
};

const mutations = {
    setQueryResult(state, data) { // data => query, result
        state.queries[data.query].result = data.result;
    },
};



export default {
    namespaced: true,
    state,
    getters,
    mutations,
};
