export function mapMonth(monthNumber: number): string{
    if(monthNumber != null){
        switch(monthNumber){
            case 1:
                return 'Styczeń';
            case 2:
                return 'Luty';
            case 3: 
                return 'Marzec';
            case 4:
                return 'Kwiecień';
            case 5:
                return 'Maj';
            case 6:
                return 'Czerwiec';
            case 7: 
                return 'Lipiec';
            case 8:
                return 'Sierpień';
            case 9:
                return 'Wrzesień';
            case 10:
                return 'Październik';
            case 11: 
                return 'Listopad';
            case 12:
                return 'Grudzień';
            default:
                return '';
        }
    } else {
        return '';
    }

}

export function mapStatus(statusCode: string): string{
    switch(statusCode){
        case 'D':
            return 'Draft';
        case 'U':
            return 'Unapproved';
        case 'P': 
            return 'Pending';
        case 'A':
            return 'Approved';
        default:
            return '';
    }
}