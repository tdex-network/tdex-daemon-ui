/* eslint-disable */
// @generated by protobuf-ts 2.8.1 with parameter add_pb_suffix,eslint_disable,ts_nocheck,keep_enum_prefix,long_type_number
// @generated from protobuf file "tdex/v1/transport.proto" (package "tdex.v1", syntax proto3)
// tslint:disable
// @ts-nocheck
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { TransportService } from "./transport_pb";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { SupportedContentTypesResponse } from "./transport_pb";
import type { SupportedContentTypesRequest } from "./transport_pb";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * TransportService is used by a Liquidity provider to announce the accepted
 * content types of incoming HTTP request messages.
 *
 * @generated from protobuf service tdex.v1.TransportService
 */
export interface ITransportServiceClient {
    /**
     * @generated from protobuf rpc: SupportedContentTypes(tdex.v1.SupportedContentTypesRequest) returns (tdex.v1.SupportedContentTypesResponse);
     */
    supportedContentTypes(input: SupportedContentTypesRequest, options?: RpcOptions): UnaryCall<SupportedContentTypesRequest, SupportedContentTypesResponse>;
}
/**
 * TransportService is used by a Liquidity provider to announce the accepted
 * content types of incoming HTTP request messages.
 *
 * @generated from protobuf service tdex.v1.TransportService
 */
export class TransportServiceClient implements ITransportServiceClient, ServiceInfo {
    typeName = TransportService.typeName;
    methods = TransportService.methods;
    options = TransportService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: SupportedContentTypes(tdex.v1.SupportedContentTypesRequest) returns (tdex.v1.SupportedContentTypesResponse);
     */
    supportedContentTypes(input: SupportedContentTypesRequest, options?: RpcOptions): UnaryCall<SupportedContentTypesRequest, SupportedContentTypesResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<SupportedContentTypesRequest, SupportedContentTypesResponse>("unary", this._transport, method, opt, input);
    }
}
