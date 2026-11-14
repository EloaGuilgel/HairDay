import dayjs from "dayjs";

import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "./hours-click.js";

const hours = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules }) {
  //limpa a lista de horarios
  hours.innerHTML = "";

  // Obtém a lista de todos os horários ocupados
  const unavaibleHours = dailySchedules.map((schedule) =>
    dayjs(schedule.when).format("H:mm"),
  );

  const opening = openingHours.map((hour) => {
    //recuperar somente a hora.
    const [scheduleHour] = hour.split(":");

    // Adiciona a hora na date e verificar se está no passado.
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs());

    const available = !unavaibleHours.includes(hour) && !isHourPast;
    return {
      hour,
      available,
    };
  });

  // Redenriza os horários.
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");

    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");

    li.textContent = hour;

    if (hour === "9:00") {
      hourHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde");
    } else if (hour == "18:00") {
      hourHeaderAdd("Noite");
    }

    hours.append(li);
  });

  //Adiciona o evento de clique nos horários.
  hoursClick();
}

function hourHeaderAdd(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;

  hours.append(header);
}
