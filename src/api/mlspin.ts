import { Address } from '../schemas/address';
import { Listing } from '../schemas/listing';
import { DataResult } from '../schemas/result';

export const openListing = (listingId: number): void => {
    const newTab = window.open(
        `https://vow.mlspin.com/VOW/listingviews/GetListing?rm=1&vf=2&summ=false&o=2&od=1&f=0&ps=0&offs=0&sel=${listingId}&sp=false&cb=16190256`,
        '_blank',
        'noopener,noreferrer'
    );
    if (newTab) {
        newTab.opener = null;
    }
};

export const scrapeSourceForListings = async (listingPage: string): Promise<DataResult<Listing[]>> => {
    const parser = new DOMParser();
    try {
        const doc = parser.parseFromString(listingPage, 'text/html');

        const listingRows = doc.querySelectorAll('tr[data-ListNo]');

        const listings: Listing[] = [];
        listingRows.forEach(async (listing) => {
            const listingId = parseInt(listing.getAttribute('data-ListNo') ?? '0');
            const bedBaths = parseBedAndBathCounts(listing.children.item(11)?.textContent ?? '');
            const addressFull = listing.children?.item(9)?.textContent ?? '';
            const parsedAddress = parseAddress(addressFull);

            listings.push({
                id: listingId,
                address: parsedAddress,
                type: bedBaths.type,
                price: parsePrice(listing.children.item(13)?.textContent ?? '0'),
                bedCount: bedBaths.bedCount,
                bathCount: bedBaths.bathCount,
            } as Listing);
        });

        return Promise.resolve({ success: true, data: listings });
    } catch (err) {
        return { success: false, error: err.toString() };
    }
};

const parseBedAndBathCounts = (content: string): { type: string; bedCount: number; bathCount: number } => {
    const matches = /(?<bed>\d)\sbed,\s(?<bathfull>\d)f\s(?<bathhalf>\d)h\sbath\s(?<type>.*)/.exec(content);
    const type = matches?.groups!['type']?.replace(/\sx[\d]+.*/, '');

    return {
        type: type ?? 'Unknown',
        bedCount: parseInt(matches?.groups!['bed'] ?? '0'),
        bathCount: parseInt(matches?.groups!['bathfull'] ?? '0') + 0.5 * parseInt(matches?.groups!['bathhalf'] ?? '0'),
    };
};

const parseAddress = (address: string): Address => {
    // Addresses come to us in the format of '[number or range] [street] [U: unit#] [city], [state][optional :neighborhood]]'
    try {
        const addressLine = address.match(/.*MA.*/);
        if (!addressLine?.length || addressLine.length !== 1) {
            throw new Error('MA not found');
        }

        const matches = /(?<street>.*)\s(?<city>[A-Za-z]+(?:\s[A-Za-z]+)*), MA/.exec(addressLine[0]);
        if (!matches?.groups) {
            throw new Error('Could not split street/city');
        }

        // First remove the worthless unit number
        let street = matches.groups['street'].trim();
        const unitOffset = street.indexOf('U:');
        const unit = unitOffset >= 0 ? street.slice(unitOffset + 2, street.length).trim() : null;
        street = unitOffset >= 0 ? street.slice(0, unitOffset - 1) : street;
        //const unitMatch = /(?:U:[\s]*(?<unit>[\w\d]+))/.exec(matches.groups['street']);
        //const street = matches.groups['street'].replace(/(?:U:[\s]*[\w\d]+)/, '').trim();

        return {
            street: street,
            unit: unit,
            city: matches.groups['city'],
            state: 'MA',
        };
    } catch (err) {
        return {
            street: err.toString(),
            city: 'nowhere',
            state: 'MA',
        } as Address;
    }
};

const parsePrice = (priceString: string): number => {
    try {
        const priceMatch = priceString.match(/(?:\$)([\d,]+)/);
        if (!priceMatch?.length || priceMatch.length !== 2) {
            throw new Error(`Invalid price format: ${priceString}`);
        }

        return parseInt(priceMatch[1].replace(',', ''));
    } catch (err) {
        return 0;
    }
};
