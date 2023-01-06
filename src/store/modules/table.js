
const state = {
    queries: {
        'rich-list': {
            result: null,
            sql: `with sender as
            (select 
            sum(AMOUNT) as send, SENDER
              from terra.core.ez_transfers
              where
            CURRENCY='uluna'
            group by 2), 
            
            RECEIVER
            as 
            (
            select 
            sum(AMOUNT) as receive, RECEIVER
              from terra.core.ez_transfers
              where
            CURRENCY='uluna'
            group by 2)
            
            select 
              case when receive is null then 0 else receive end as receivee, RECEIVER as user , (receivee-send)/1e6 as balance
              from sender a left join RECEIVER b 
            on a.sender=b.RECEIVER 
            order by balance desc
            limit 100`
        },
        'The-top-20-addresses-with-the-most-bridged-out-Luna': {
            result: null,
            sql: `with bridge_out as
            (select date_trunc('day',BLOCK_TIMESTAMP) as date,MESSAGE_VALUE['sender'] as senderr, MESSAGE_VALUE['receiver'] as receiverr,(AMOUNT/1e6) as volume
              , 
              case 
              when SUBSTR(receiverr, 0, 4) = 'osmo' then 'osmo' 
              when SUBSTR(receiverr, 0, 4) = 'axel' then 'axelar' 
              when SUBSTR(receiverr, 0, 4) = 'grav' then 'GRAV' 
              when SUBSTR(receiverr, 0, 4) = 'secr' then 'secret' 
              when SUBSTR(receiverr, 0, 4) = 'terr' then 'terra' 
              when SUBSTR(receiverr, 0, 3) = 'cre' then 'CRE'
              when SUBSTR(receiverr, 0, 3) = 'sif' then 'SIF'
              when SUBSTR(receiverr, 0, 4) = 'kuji' then 'kujira'
              when SUBSTR(receiverr, 0, 4) = 'cosm' then 'cosmos'
              when SUBSTR(receiverr, 0, 4) = 'evmo' then 'evmos'
              when SUBSTR(receiverr, 0, 4) = 'stri' then 'STRI'
              when SUBSTR(receiverr, 0, 4) = 'juno' then 'juno'
              else null end as blockchain
            
              
              from terra.core.ez_transfers
            where 
            MESSAGE_TYPE='/ibc.applications.transfer.v1.MsgTransfer' and CURRENCY='uluna')
            
            select sum(volume) as volume ,senderr from bridge_out 
            
            group by 2 
            order by 1 desc 
            limit 20`
        },
        'Stable-coin-supply': {
            result: null,
            sql: `(select 
 
                sum(case when to_CURRENCY='ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4' then to_AMOUNT/1e6 else null end) -
                sum(case when FROM_CURRENCY='ibc/B3504E092456BA618CC28AC671A71FB08C6CA0FD0BE7C8A5B5A3E2DD933CC9E4' then FROM_AMOUNT/1e6 else null end) as volume, 'AXlusdc' as stablecoin
              
               
              from 
              
              terra.core.ez_swaps)
              
              union all 
              
              (select 
               
               
                sum(case when to_CURRENCY='terra1rwg5kt6kcyxtz69acjgpeut7dgr4y3r7tvntdxqt03dvpqktrfxq4jrvpq' then to_AMOUNT/1e6 else null end) as volume,'ust' as stablecoin
              
                
              from 
              
              terra.core.ez_swaps)
              
              
              union all 
              
              (select 
               
              
                 sum(case when to_CURRENCY='terra1uc3r74qg44csdrl8hrm5muzlue9gf7umgkyv569pgazh7tudpr4qdtgqh6' then to_AMOUNT/1e6 else null end) as volume ,'usdc' as stablecoin
                
                
              from 
              
              terra.core.ez_swaps)
              
              
              
              union all 
              
              (select 
               
               
                 sum(case when to_CURRENCY='terra1ery8l6jquynn9a4cz2pff6khg8c68f7urt33l5n9dng2cwzz4c4qj3spm2' then to_AMOUNT/1e6 else null end) as volume , 'usdt' as stablecoin
                
              from 
              
              terra.core.ez_swaps)
              
              union all 
              
              
              
              (select 
               
                -sum(case when to_CURRENCY='ibc/CBF67A2BCF6CAE343FDF251E510C8E18C361FC02B23430C121116E0811835DEF' then to_AMOUNT/1e6 else null end) +
                sum(case when FROM_CURRENCY='ibc/CBF67A2BCF6CAE343FDF251E510C8E18C361FC02B23430C121116E0811835DEF' then FROM_AMOUNT/1e6 else null end) as volume, 'AXlusdt' as stablecoin
              
                
              from 
              terra.core.ez_swaps
                
              )
              
                `
        }
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
