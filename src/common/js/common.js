/**
 * Created by cone41 on 2018/6/7.
 */
export default {
    formateTime(time){
        time = new Date(time);
        let year = time.getFullYear();
        let month = time.getMonth();
        let day = time.getDay();
        let hour = time.getHours();
        let min = time.getMinutes();
        return this.formate(year) + '-' + this.formate(month) + '-' + this.formate(day) + ' ' + this.formate(hour) + ':' + this.formate(min);
    },
    
    formate(time){
        if (time < 10) {
            return '0' + time;
        } else {
            return time;
        }
    }
    
    
};