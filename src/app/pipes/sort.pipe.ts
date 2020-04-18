import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/user.model';
import { SortOrder } from '../enums/sortOrder.enum';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {
    transform (array: Array<UserModel>, sortOrder: SortOrder = SortOrder.NO_SORT, sortKey: string) {
        if (!array || sortOrder === SortOrder.NO_SORT || !sortKey) {
            return array;
        }
        array = [...array];
        let naturalCompare = (first, second) => {
            let firstSplitItems = [], secondSplitItems = [];

            first[sortKey].toString().replace(
                /(\d+)|(\D+)/g,
                (_, $1, $2) => {
                    firstSplitItems.push([$1 || Infinity, $2 || ""])
                }
            );
            second[sortKey].toString().replace(
                /(\d+)|(\D+)/g,
                (_, $1, $2) => {
                    secondSplitItems.push([$1 || Infinity, $2 || ""])
                }
            );

            while(firstSplitItems.length && secondSplitItems.length) {
                let firstSplitItem = firstSplitItems.shift();
                let secondSplitItem = secondSplitItems.shift();
                let result = (firstSplitItem[0] - secondSplitItem[0]) || firstSplitItem[1].localeCompare(secondSplitItem[1]);
                if (result) {
                    if (sortOrder === SortOrder.ASC) {
                        return result;
                    } else {
                        return -result;
                    }
                }
            }

            let result  = firstSplitItems.length - secondSplitItems.length;
            if (SortOrder.ASC) {
                return result;
            } else {
                return -result;
            }
        }
        let sortedArray: Array<UserModel> = array.sort(naturalCompare);

        return sortedArray;
    }
}
