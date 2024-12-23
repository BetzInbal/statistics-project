import { IEvent } from "../models/eventModel";
import AreaModel from "../models/AreaModel";
import { areas, types, yearsOrg, yers } from "../config/seed";
import Typemodel from "../models/Typemodel";
import YearModel from "../models/YearModel";


export let totnk = 0
export let totnw = 0
const insertToTypes = async (event: IEvent) => {
    try {
        let type = types.find((t) => t.type === (event.attacktype1_txt || "Unknown")) //await Typemodel.findOne({ type: event.attacktype1_txt })
        if (!type) {
            type = new Typemodel({
                type: (event.attacktype1_txt || "Unknown"),
                total_damage: 0
            })
            types.push(type)
        }
        type.total_damage += (event.nkill + event.nwound)
        totnk += event.nkill
        totnw += event.nwound
        //type.$inc("total_damage", event.nkill + event.nwound)
        //await type.save()
        //return event
    } catch (error) {
        console.log("[insertToTypes]")
        console.error(error);
    }
}

    const insertToArieas = async (event: IEvent) => {
        try {
            //console.log(event._id);
            let area = areas.find((a)=> a.area === (event.country_txt || "Unknown")) // await AreaModel.findOne({ area: event.city })
            if (!area) {
                area = new AreaModel({
                    area:  (event.country_txt || "Unknown"),
                    latitude: event.latitude,
                    longitude: event.longitude

                })
                areas.push(area)
            }
            let incidents = area.incidents.find((i) => i.gname === event.gname)
            if (!incidents) {
                area.incidents.push({
                    gname: event.gname,
                    total_damage: event.nkill + event.nwound,
                    total_incidents: 1
                })
            }
            else {
                incidents.total_damage += (event.nkill + event.nwound)
                incidents.total_incidents++
            }
            area.latitude = area.latitude ? area.latitude : event.latitude;
            area.longitude = area.longitude ? area.longitude : event.longitude;
            area.$inc("total_damage", event.nkill + event.nwound)
            area.$inc("total_incidents", 1)
            area.avg = area.total_damage / area.total_incidents
            //await area.save()
        } catch (error) {
            console.log("[insertToArieas]")

            console.error(error);

        }

    }

const insertToYears = async (event: IEvent) => {
    try {
        let year = yers.find((y)=> y.year === event.iyear ) //await YearModel.findOne({ year: event.iyear })
        if (!year) {
            year = new YearModel({
                year: event.iyear
            })
            yers.push(year)
        }
        if (!year[`m${event.imonth as 1}`]?.arr_incidents.length)
        {
            year[`m${event.imonth as 1}`] =  {
                total_incidents:0,
                arr_incidents : [{
                gname: event.gname,
                total_incidents: 0
            }]}
        }
        let incidents = year[`m${event.imonth as 1}`]!.arr_incidents.find((i) => i.gname === event.gname)
        if (!incidents) {
            //ear[`m${event.imonth as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}`]=[]
            year[`m${event.imonth as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}`]!.arr_incidents
                .push({
                    gname: event.gname,
                    total_incidents: 1
                })
        }
        else {
            incidents.total_incidents++
        }
        year.$inc("total_incidents", 1)
        year[`m${event.imonth as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}`]!.total_incidents += 1
        //await year.save()
        console.log(year.year);
        
    } catch (error) {
        console.log("[insertToYears]")

        console.error(error);

    }

}

const insertToIYearOrg = async (event: IEvent) => {
    try {
        let yearOrg = yearsOrg.find((y)=> y.year === event.iyear ) //await YearModel.findOne({ year: event.iyear })
        if (!yearOrg) {
            yearOrg = new YearModel({
                year: event.iyear
            })
            yers.push(year)
        }
        if (!year[`m${event.imonth as 1}`]?.arr_incidents.length)
        {
            year[`m${event.imonth as 1}`] =  {
                total_incidents:0,
                arr_incidents : [{
                gname: event.gname,
                total_incidents: 0
            }]}
        }
        let incidents = year[`m${event.imonth as 1}`]!.arr_incidents.find((i) => i.gname === event.gname)
        if (!incidents) {
            //ear[`m${event.imonth as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}`]=[]
            year[`m${event.imonth as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}`]!.arr_incidents
                .push({
                    gname: event.gname,
                    total_incidents: 1
                })
        }
        else {
            incidents.total_incidents++
        }
        year.$inc("total_incidents", 1)
        year[`m${event.imonth as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12}`]!.total_incidents += 1
        //await year.save()
        console.log(year.year);
        
    } catch (error) {
        console.log("[insertToYears]")

        console.error(error);

    }

}

export default async (event: IEvent) => {

    await insertToArieas(event)

}
