import {getLogger} from './Logger';
import * as graphql from 'graphql';

const log = getLogger('graphql_request_logger');
export default class GraphqlRequestLogger {
    public static log(httpRequest) {
        const result = [];
        const request = graphql.parse(httpRequest.body.query);
        request.definitions.forEach(definition => {
            if ('selectionSet' in definition) {
                definition.selectionSet.selections.forEach(selection => {
                    if ('name' in selection) {
                        result.push(selection.name.value);
                    }
                });
            }
        });

        log.trace(`Requested root paths: [${result.join(', ')}]`);
    }
}

