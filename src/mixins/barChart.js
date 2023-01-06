
export const barChartMixin = {
    data() {
        return {
            defaultChartData: {
                labels: [],
                datasets: [{
                    label: 'loading ...',
                    backgroundColor: ['rgba(21,91,255,0.8)'],
                    data: []
                }]
            },
        }
    },
    computed: {
        barChartData() {
            // ! if we need stacked (multiple data) we must use group by.
            // ! if we use group by typeof _data is object

            let _data = this.$store.getters[`${this.namespace}/getQueries`][this.queryName];
            if (!_data?.result?.records) return this.defaultChartData;

            _data = _data.result.records;

            if (this.queryName == "Daily-bridge-out-active-users") {
                // console.log("A", _data);
            }


            // filter by global functions.
            if (this.slice) _data = _data.slice(0, this.slice);
            if (this.groupBy && Object.keys(this.groupBy).length > 0) _data = this.groupByHandler(this.groupBy.by, _data);
            if (this.sort && Object.keys(this.sort).length > 0) _data.sort(this.sortHandler);
            if (this.sortDate && Object.keys(this.sortDate).length > 0) _data.sort(this.sortDateHandler);
            if (this.someInGroup && Object.keys(this.someInGroup).length) _data = this.sumInGroupHandler(this.someInGroup.by, this.someInGroup.over, _data);

            // works for single data chart
            if (this.stacked.number > 1) { // * as mentioned, _data is object, and we used group by for stack

                if (this.groupBy && Object.keys(this.groupBy).length > 0) { // ? stacked but not group by
                    var _chart = {
                        labels: [],
                        datasets: []
                    }
                    _chart.labels = Object.keys(_data)
                    var j = 0;
                    let arr = Object.values(_data);
                    let _allData = [];
                    while (j < arr.length) {
                        arr[j]; // => array with 3 object
                        let d = 0;
                        while (d < this.stacked.number) {
                            _allData.push(arr[j][d]);
                            d++;
                        }
                        j++;
                    }

                    let i = 0;
                    while (i < this.stacked.number) {

                        let _stacked = this.stacked;
                        _chart.datasets.push({
                            label: this.stacked.order[i],
                            borderColor: this.colors[i],
                            backgroundColor: this.colors[i],
                            data: _allData.filter(function (el) {
                                if (el && el[_stacked.column] === _stacked.order[i]) {
                                    // console.log("H", el[_stacked.column]);
                                    return true
                                }
                                return false;
                            }),
                            tension: 0.4,
                            borderWidth: 2,
                            borderRadius: 10,
                            order: this.stacked.order.indexOf(this.stacked.order[i]) > -1 ? this.stacked.order.indexOf(this.stacked.order[i]) : 100
                        })
                        i++;
                    }

                    return _chart;
                } else {

                    if (this.someInGroup && Object.keys(this.someInGroup).length) {
                        return {
                            labels: Object.keys(_data),
                            datasets: [{
                                data: Object.values(_data),
                                backgroundColor: this.colors,
                                label: this.label,
                                borderWidth: 0,
                                borderRadius: 4,
                            }]
                        }
                    }

                    let _chart = {
                        labels: _data.map(el => this.$options.filters.formatDate(el[this.axis.x], "date")), // as xAxis,
                        datasets: []
                    }
                    let i = 0;
                    while (i < this.stacked.number) {
                        _chart.datasets.push({
                            label: this.stacked.order[i],
                            borderColor: this.colors[i],
                            backgroundColor: this.colors[i],
                            data: _data.map(el => el.number),
                            tension: 0.4,
                            borderWidth: 0,
                            borderRadius: 4,
                            order: this.stacked.order.indexOf(this.stacked.order[i])
                        })
                        i++;
                    }
                    // _data.map(el => {
                    //     // console.log(el);
                    // })
                    return _chart;
                }





                // var _datasets = [];
                // let d = 0;
                // while (d < Object.keys(_data).length) {
                //     if (this.queryName === "daily-staking-action") {
                //         // console.log(Object.values(_data)[d].map(el => el.number))
                //         // console.log(Object.keys(_data)[d]);
                //     }


                //     _datasets.push({
                //         lable: Object.keys(_data)[d],
                //         data: Object.values(_data)[d].map(el => el.number),
                //         // order: this.stackedOrder.indexOf(this.stackedOrder[d]) > -1 ? this.stackedOrder.indexOf(this.stackedOrder[d]) : 100,
                //         borderColor: this.colors[d],
                //         backgroundColor: this.colors[d],
                //     })
                //     d++;
                // }
                // if (this.queryName === "daily-staking-action") {
                //     // console.log(Object.values(_data)[d].map(el => el.number))
                //     // console.log(Object.keys(_data)[d]);
                //     console.log({
                //         labels: Object.keys(_data),
                //         // labels: _data.map(el => this.$options.filters.formatDate(el[this.axis.x], "date")),
                //         datasets: _datasets
                //     });

                // }
                // return {
                //     labels: Object.keys(_data),
                //     // labels: _data.map(el => this.$options.filters.formatDate(el[this.axis.x], "date")),
                //     datasets: _datasets
                // }
                // var _datasets = {};
                // if (!this.stackedColumn) throw new Error("stacked-column is required when stacked > 1");
                // let s = 0;
                // let _items = Object.keys(_data);
                // while(s < this.stacked) {
                //     if(this.stackedOrder) {
                //         _datasets[this.stackedOrder[s]] = [];
                //     } else {
                //         _datasets[_items[s]] = []
                //     }
                //     s++;
                // }
                // // for (let c = 0; c < this.stacked; c++) {
                // //     _datasets[this.stackedOrder[c]] = [];
                // // }
                // var _chartData = {
                //     labels: [],
                //     datasets: []
                // };

                // if (this.queryName == "Daily-bridge-out-active-users") {
                //     // console.log(_chartData);
                // }

                // for (const key in _data) {
                //     if (Object.hasOwnProperty.call(_data, key)) { // key : grouped by in above
                //         const element = _data[key];
                //         _chartData.labels.push(this.$options.filters.formatDate(key, 'date')); // push xAxis
                //         element.forEach(el => {
                //             _datasets[el[this.stackedColumn]].push(el[this.axis.y]); // push yAxis
                //         });
                //     }
                // }
                // var j = 0;
                // for (let key in _datasets) {
                //     if (Object.hasOwnProperty.call(_datasets, key)) {
                //         let element = _datasets[key];
                //         _chartData.datasets.push({
                //             label: key,
                //             data: element,
                //             backgroundColor: this.colors[j],
                //         });
                //         j = j + 1;
                //     }
                // }
                // return _chartData;
            } else {  // * _data is array and not grouped, we just maybe sort it
                if (this.someInGroup && Object.keys(this.someInGroup).length) {
                    return {
                        labels: Object.keys(_data),
                        datasets: [{
                            data: Object.values(_data),
                            // backgroundColor: this.colors,                     
                            backgroundColor: this.colorGenerator(),
                            label: this.label,
                            borderWidth: 0,
                            borderRadius: 4,
                        }]
                    }
                }

                return {
                    labels: this.dotFormatDate ? _data.map(el => el[this.axis.x]) : _data.map(el => this.$options.filters.formatDate(el[this.axis.x], 'date')),
                    datasets: [{
                        label: this.label,
                        // backgroundColor: ['rgba(21,91,255,0.8)'],
                        backgroundColor: this.colorGenerator(),
                        data: _data.map(el => el[this.axis.y]),
                        borderWidth: 0,
                        borderRadius: 4,
                    }]
                }
            }

        }
    },
    methods: {
    }
}