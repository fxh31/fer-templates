/**
 * 时间转换 - Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';
import { getDateFormat } from '@/utils/fer';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export type FormatDate = dayjs.ConfigType;

export function formatToDateTime(date: dayjs.ConfigType = undefined, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(getDateFormat(format));
}

export function formatToDate(date: dayjs.ConfigType = undefined, format = DATE_FORMAT): string {
  return dayjs(date).format(getDateFormat(format));
}

export const dateUtil = dayjs;

export function parseISODuration(duration: string): { years: number; months: number; days: number } {
  const regex = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?$/;
  const match = duration.match(regex);
  if (!match) {
    throw new Error(`Invalid ISO 8601 duration format: ${duration}`);
  }
  const years = match[1] ? parseInt(match[1], 10) : 0;
  const months = match[2] ? parseInt(match[2], 10) : 0;
  const days = match[3] ? parseInt(match[3], 10) : 0;
  return { years, months, days };
}

export function toISODuration(years: number, months: number, days: number): string {
  let duration = 'P';
  if (years > 0) {
    duration += `${years}Y`;
  }
  if (months > 0) {
    duration += `${months}M`;
  }
  if (days > 0) {
    duration += `${days}D`;
  }
  // 如果没有年、月、日，则返回 'P0D'
  if (duration === 'P') {
    duration += '0D';
  }
  return duration;
}
