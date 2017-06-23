/**
 * Created by hang on 2017/6/23.
 */

import Fucksvg from './fucksvg';
import DataBox from './fucksvg.databox'
import Element from './fucksvg.element'
import AbstractNode from './fucksvg.abstractnode'
import {Node, CircleNode, GhomboidNode, TipNode, TextNode, HeartNode, UMLClassNode, EndPointNode} from './fucksvg.node'
import {Container, GridContainer, OneItemContainer, GhomboidContainer} from './fucksvg.container'

Fucksvg.Circle = Circle;
Fucksvg.Rect = Rect;

Fucksvg.DataBox = DataBox;
Fucksvg.Element = Element;
Fucksvg.AbstractNode = AbstractNode;

Fucksvg.Node = Node;
Fucksvg.CircleNode = CircleNode;
Fucksvg.GhomboidNode = GhomboidNode;
Fucksvg.TipNode = TipNode;
Fucksvg.TextNode = TextNode;
Fucksvg.HeartNode = HeartNode;
Fucksvg.UMLClassNode = UMLClassNode;
Fucksvg.EndPointNode = EndPointNode;

Fucksvg.Container = Container;
Fucksvg.GridContainer = GridContainer;
Fucksvg.OneItemContainer = OneItemContainer;
Fucksvg.GhomboidContainer = GhomboidContainer;

window.Fucksvg = Fucksvg;
window.JTopo = Fucksvg;
window.Topo = Fucksvg;