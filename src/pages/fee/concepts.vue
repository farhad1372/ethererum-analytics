<template>
  <div class="row">
    <div calss="col-12">
      <img src="@/assets/images/gas.png" style="width: 100%" />
      <h1>Concepts</h1>
      <h2 class="mt-10">WHAT IS GAS?</h2>
      <p>
        Gas refers to the unit that measures the amount of computational effort required
        to execute specific operations on the Ethereum network<br />
        Since each Ethereum transaction requires computational resources to execute, each
        transaction requires a fee. Gas refers to the fee required to conduct a
        transaction on Ethereum successfully.<br />
        Gas fees are paid in Ethereum's native currency, ether (ETH). Gas prices are
        denoted in gwei, which itself is a denomination of ETH - each gwei is equal to
        0.000000001 ETH (10-9 ETH). For example, instead of saying that your gas costs
        0.000000001 ether, you<br />
        can say your gas costs 1 gwei. The word 'gwei' itself means 'giga-wei', and it is
        equal to 1,000,000,000 wei. Wei itself (named after Wei Dai, creator of b-money)
        is the smallest unit of ETH.<br />
      </p>
      <h2 class="mt-10">PRIOR TO THE LONDON UPGRADE</h2>
      <p>
        The way transaction fees on the Ethereum network were calculated changed with the
        London Upgrade of August 2021. Here is a recap of how things used to work:<br />
        Let's say Alice had to pay Bob 1 ETH. In the transaction, the gas limit is 21,000
        units, and the gas price is 200 gwei.<br />
        Total fee would have been: Gas units (limit) * Gas price per unit i.e 21,000 * 200
        = 4,200,000 gwei or 0.0042 ETH <br />
      </p>
      <h2 class="mt-10">AFTER THE LONDON UPGRADE</h2>
      <p>
        Let's say Jordan has to pay Taylor 1 ETH. In the transaction, the gas limit is
        21,000 units and the base fee is 10 gwei. Jordan includes a tip of 2 gwei. <br />
        The total fee would now be: units of gas used * (base fee + priority fee) where
        the base fee is a value set by the protocol and the priority fee is a value set by
        the user as a tip to the validator.<br />
        i.e 21,000 * (10 + 2) = 252,000 gwei or 0.000252 ETH.<br />
        When Jordan sends the money, 1.000252 ETH will be deducted from Jordan's account.
        Taylor will be credited 1.0000 ETH. Validator receives the tip of 0.000042 ETH.
        Base fee of 0.00021 ETH is burned.<br />
        Additionally, Jordan can also set a max fee (maxFeePerGas) for the transaction.
        The difference between the max fee and the actual fee is refunded to Jordan, i.e.
        refund = max fee - (base fee + priority fee). Jordan can set a maximum amount to
        pay for the<br />
        transaction to execute and not worry about overpaying "beyond" the base fee when
        the transaction is executed.<br />
      </p>
      <h3 class="mt-5">Block size</h3>
      <p>
        Before the London Upgrade, Ethereum had fixed-sized blocks. In times of high
        network demand, these blocks operated at total capacity. As a result, users often
        had to wait for high demand to reduce to get included in a block, which led to a
        poor user <br />
        experience.<br />
        The London Upgrade introduced variable-size blocks to Ethereum. Each block has a
        target size of 15 million gas, but the size of blocks will increase or decrease in
        accordance with network demand, up until the block limit of 30 million gas (2x the
        target block<br />
        size). The protocol achieves an equilibrium block size of 15 million on average
        through the process of tâtonnement. This means if the block size is greater than
        the target block size, the protocol will increase the base fee for the following
        block. Similarly, the<br />
        protocol will decrease the base fee if the block size is less than the target
        block size. The amount by which the base fee is adjusted is proportional to how
        far the current block size is from the target.More on blocks.<br />
      </p>
      <h3 class="mt-5">Base fee</h3>
      <p>
        Every block has a base fee which acts as a reserve price. To be eligible for
        inclusion in a block the offered price per gas must at least equal the base fee.
        The base fee is calculated independently of the current block and is instead
        determined by the blocks<br />
        before it - making transaction fees more predictable for users. When the block is
        mined this base fee is "burned", removing it from circulation.<br />
        The base fee is calculated by a formula that compares the size of the previous
        block (the amount of gas used for all the transactions) with the target size. The
        base fee will increase by a maximum of 12.5% per block if the target block size is
        exceeded. This <br />
        exponential growth makes it economically non-viable for block size to remain high
        indefinitely[2].<br />
      </p>
    </div>
  </div>
</template>
