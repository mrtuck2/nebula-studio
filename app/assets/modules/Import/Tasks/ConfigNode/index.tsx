import { Button, Icon, Tabs } from 'antd';
import React from 'react';
import intl from 'react-intl-universal';
import { connect } from 'react-redux';

import CSVPreviewLink from '#assets/components/CSVPreviewLink';
import { IDispatch, IRootState } from '#assets/store';

import Add, { AddType } from '../Add';
import './index.less';

const { TabPane } = Tabs;

const mapState = (state: IRootState) => ({
  vertexesConfig: state.importData.vertexesConfig,
  activeVertex: state.importData.activeVertex,
});

const mapDispatch = (dispatch: IDispatch) => ({
  updateVertexesConfig: config =>
    dispatch.importData.update({
      vertexesConfig: config,
    }),
  updateActiveVertex: vertex => {
    dispatch.importData.update({
      activeVertex: vertex,
    });
  },
});

interface IProps
  extends ReturnType<typeof mapState>,
    ReturnType<typeof mapDispatch> {}

class ConfigNode extends React.PureComponent<IProps> {
  handleDelete = vertexName => {
    const { vertexesConfig, activeVertex } = this.props;
    const newVertexesConfig = vertexesConfig.filter(
      config => config.name !== vertexName,
    );

    this.props.updateVertexesConfig(newVertexesConfig);
    if (activeVertex === vertexName) {
      this.props.updateActiveVertex(
        newVertexesConfig[0] && newVertexesConfig[0].name,
      );
    }
  };

  render() {
    const { vertexesConfig, activeVertex } = this.props;

    return (
      <div className="vertex-config task">
        <div className="vertexes">
          <h3>Vertexes</h3>
          <div className="operation">
            <Add type={AddType.vertex} />
          </div>
          <Tabs
            activeKey={activeVertex}
            onTabClick={this.props.updateActiveVertex}
          >
            {vertexesConfig.map(vertex => (
              <TabPane
                tab={
                  <p className="tab-content">
                    {vertex.name}
                    <Button
                      type="link"
                      onClick={e => {
                        e.stopPropagation();
                        this.handleDelete(vertex.name);
                      }}
                    >
                      <Icon type="close" />
                    </Button>
                  </p>
                }
                key={vertex.name}
              >
                <CSVPreviewLink file={vertex.file}>
                  {vertex.file.name}
                </CSVPreviewLink>
              </TabPane>
            ))}
          </Tabs>
        </div>
        <Button type="primary" className="next">
          {intl.get('import.next')}
        </Button>
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch,
)(ConfigNode);
