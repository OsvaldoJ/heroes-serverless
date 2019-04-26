"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const { villains: container } = config_1.default;
function getVillains(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { req, res } = context;
        try {
            const { result: villains } = yield container.items.readAll().toArray();
            res.status(200).json(villains);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
function postVillain(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { req, res } = context;
        const villain = {
            name: req.body.name,
            description: req.body.description,
            id: undefined
        };
        villain.id = `Villain${villain.name}`;
        try {
            const { body } = yield container.items.create(villain);
            res.status(201).json(body);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
function putVillain(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { req, res } = context;
        const villain = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description
        };
        try {
            const { body } = yield container.items.upsert(villain);
            res.status(200).json(body);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
function deleteVillain(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { req, res } = context;
        const { id } = req.params;
        try {
            const { body } = yield container.item(id).delete();
            res.status(200).json(body);
        }
        catch (error) {
            res.status(500).send(error);
        }
    });
}
exports.default = { getVillains, postVillain, putVillain, deleteVillain };
//# sourceMappingURL=villain.service.js.map