/**
 * @param {number[]} hours
 * @return {number}
 */
var longestWPI = function(hours) {
    let hoursSize = hours.length;
    if(hours == null || hoursSize == 0) return 0;
    for(let i=0;i<hoursSize;i++){
        hours[i] = hours[i] > 8 ? 1:-1;
    }
    let sum;
    let maxLen = 0;
    let len;
    for(let i=0;i<hoursSize;i++){
        sum = 0;
        for(let k=i;k<hoursSize;k++){
            sum += hours[k];
            if(sum > 0) {
                len = k-i+1;
                if(len>maxLen) maxLen = len;
            }
        }
    }
    return maxLen;
};
